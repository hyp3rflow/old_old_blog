---
title: 'Helltaker C++ API (HellSolver) Code Review'
categories:
    - Project
last_modified_at: 2020-09-17T11:26:00
toc: true
path: '/Project/HellSolver-1'
---

# HellSolver Code Review

> 2020년 9월 7일쯤에 시작한 [헬테이커 C++ API 구현](https://github.com/utilForever/HellSolver)은 4일이 지난 11일쯤에 최종 PR을 넣을 수 있을 정도로 완성되었다.  
> 첫 C++ 프로젝트였고, 찬호형이 코드 리뷰를 해준 덕분에 여러가지 중요한 것들을 알게 되었고 리마인드의 필요성을 느꼈기에 이렇게 포스트로 쓴다.  
> 소중한 시간 내어 코드를 고쳐준 [옥찬호 Chris Ohk](https://github.com/utilForever) 형에게 이 자리를 빌려 감사드린다.

## 1. [fix: Replace raw pointer with 'std::unique_ptr'](https://github.com/utilForever/HellSolver/commit/c59cb973bce84dae3d11ba1bb928523b21bd4929)

### 유니크 포인터

```c++
std::unique_ptr<Player> GamePlayer;
...
GamePlayer = std::make_unique<Player>(StartPoint.first, StartPoint.second,
                            m_map.GetInitMoveCount());
```

Player를 가리키는 포인터인 GamePlayer는 한 Game 당 유일하게 존재하는 하나의 Player를 가리키는 포인터이므로, unique_ptr을 적용시킬 수 있는 것 같다.

[unique_ptr@모두의 코드](https://modoocode.com/229)에서 보았을 때, 그저 객체의 유일한 소유권을 가지는 포인터인 것만 안 채로 넘어갔고 이번 프로젝트에서 실제로 사용할 생각을 못했었다.

unique_ptr은 C++11에서 나온 smart pointers 중 하나이다.  
스마트 포인터는 일반적인 포인터가 아닌 포인터 **객체**이기 때문에, 자신이 소멸될 때 자신이 가리키고 있는 데이터도 같이 할당 해제해주게 된다.

C++ 레퍼런스를 찾아보니 다음과 같은 말이 있었다.  
As the name implies, make sure that only exactly one copy of an object exists.  
즉, 유니크 포인터는 가리키는 오브젝트에 대한 유일한 소유권을 부여받는 포인터라는 뜻.

### 유니크 포인터의 주의점

-   복사 생성자가 삭제되어 있으므로 복사는 불가능하나, 소유권 이전은 std::move() 함수를 통해 가능하다.  
    이 경우, 소유권이 이전된 포인터를 재참조할 시 런타임 에러가 나기 때문에 다시 참조해서는 안된다.

또한 C++14에서 추가된 기능인 std::make_unique 함수를 사용한 것도 짚고 넘어갈 필요성을 느꼈다.

```c++
std::unique_ptr<Foo> ptr(new Foo(3, 5));
auto ptr = std::make_unique<Foo>(3, 5);
```

위의 유니크 포인터 선언과 똑같은 역할을 한다고 한다.

### vector와 emplace_back

모두의 코드에서는 유니크 포인터를 원소로 가지는 벡터를 선언했을 때 주의해야 할 점도 적혀있었다.  
프로그래밍이나 알고리즘 구현에서 벡터를 사용할 일이 굉장히 많기도 하고, 스마트 포인터나 여러 자료구조를 벡터화할 필요성도 느꼈기 때문에 적어두고 가기로 한다.

```c++
int main() {
  std::vector<std::unique_ptr<Foo>> vec;
  std::unique_ptr<Foo> Bar(new Foo(1));

  vec.push_back(Bar);
}
```

다음과 같이 작성할 경우 컴파일 에러가 나게 되는데, 이유는 **push\_back 함수가 전달된 인자를 복사해서 집어넣기 때문이다.**  
unique\_ptr은 복사 생성자가 제거되어 있으므로, std::move를 이용하거나 emplace\_back을 이용하면 간단하게 해결할 수 있다.

```c++
int main() {
  std::vector<std::unique_ptr<Foo>> vec;
  std::unique_ptr<Foo> pa(new Foo(1));

  vec.push_back(std::move(pa));
  // OR vec.emplace_back(new Foo(1));
  // -> vec.push_back(std::unique_ptr<Foo>(new Foo(1))); 와 동일함.
  // 객체가 생성되어서 복사되는 것과 내부적으로 객체를 만드는 것은 다르다!

  pa->print(); // 물론 접근해서는 안된다.
}
```

## 2. [refactor: Add default or deleted special methods](https://github.com/utilForever/HellSolver/commit/395f7ea7e588668b7869d54f0235c6804164e544)

```c++
class RandomAgent final : public IAgent
{
 public:
    //! Default constructor.
    RandomAgent() = default;

    //! Deleted copy constructor.
    RandomAgent(const RandomAgent&) = delete;

    //! Deleted move constructor.
    RandomAgent(RandomAgent&&) noexcept = delete;

    //! Default virtual destructor.
    virtual ~RandomAgent() = default;

    //! Deleted copy assignment operator.
    RandomAgent& operator=(const RandomAgent&) = delete;

    //! Deleted move assignment operator.
    RandomAgent& operator=(RandomAgent&&) noexcept = delete;

    //! Gets an action of agent.
    //! \param state The current game state.
    //! \return An action of agent.
    Direction GetAction(const Game& state) override;
};
```

### [복사 생성자와 복사 대입 연산자의 차이](https://pmoncode.tistory.com/23)

```c++
Foo t1;				// default
Foo t2(t1);		// copy
Foo t3 = t1;	// copy
t1 = t2; 			// copy assignment
```

-   그냥 선언을 하면 → 기본 생성자 _Default constructor_
-   생성 시기 때 같은 타입을 인자로 넣어주거나 대입 연산한다면 → 복사 생성자 _Copy constructor_
-   일반 상황에서 대입 연산한다면 → 복사 대입 연산자 _Copy assignment operator_

### 이동 생성자와 이동 대입 연산자의 차이

```c++
Foo t1;									// default
Foo t2(std::move(t1));	// move
Foo t3 = std::move(t1);	// move
Foo t4;									// default
t4 = std::move(t1);			// move assignment
```

-   그냥 선언을 하면 → 기본 생성자 _Default constructor_
-   생성 시기 때 우측값 레퍼런스을 인자로 넣어주거나 대입 연산한다면 → 이동 생성자 _Move constructor_
-   일반 상황에서 우측값 레퍼런스로 대입 연산한다면 → 이동 대입 연산자 _Move assignment operator_

### [noexcept (since C++11)](https://en.cppreference.com/w/cpp/language/noexcept_spec)

-   Every function in C++ is either non-throwing or potentially throwing;  
    potentially-throwing functions are:

    -   functions declared **without noexcept specifier except for default constructors, copy constructors, move constructors that are implicitly-declared or defaulted on their first declaration** unless

        -   a constructor for a base or member that the implicit definition of the constructor would call is potentially-throwing
        -   a subexpression of such an initalization, such as a default argument expression, is potentially-throwing
        -   a default member initalizer (for default constructor only) is potentially-throwing.

## 3. [refactor: Replace 'typedef' alias with 'using' alias](https://github.com/utilForever/HellSolver/commit/1d86bb032632c0a523721d8873d1db806f52ed67)

```c++
using Tile = std::pair<ObjectType, ObjectType>;
using Position = std::pair<std::size_t, std::size_t>;
```

모던 C++에서는 typedef를 사용하지 않고 using 키워드를 사용한다고 한다.

### [typedef와 using의 차이점](https://unikys.tistory.com/381)

```c++
typedef std::shared_ptr<MyClass> my_make_shared(int, std::string);
using my_make_shared = std::shared_ptr<MyClass>(int, std::string);

template <typename T>
using my_vector = std::vector<T>;
```

-   using은 template을 지원한다.
-   그 이외에 별 차이점은 없다고 한다.

## 4. [refactor: Replace 'size_t' with 'std::size_t'](https://github.com/utilForever/HellSolver/commit/5f78568867d907e05709751ab912ee18158adf20)

-   size_t와 std::size_t의 큰 차이점은 없어보이나 C++ 명세에 따르면 std namespace 안에 정의되어 있으므로 std::size_t로 쓰는게 맞는거 같다.
-   std::size_t와 size_t를 혼동해서 쓰다보면 코드 보기가 엉망일 수 있으므로 둘 중 하나를 골라서 쓰도록 하자.

## 5. [refactor: Add 'const' keyword and rename local variables](https://github.com/utilForever/HellSolver/commit/25ef7700b915604d23c32e7e0c290bb3e588a53b)

-   가능하다면 프로그래머의 편의를 위해서 const인 부분은 명확하게 표기를 하고 넘어가도록 하자.

## 6. [refactor: Change the name of method 'SetLurker()' to 'FlipLurkerFlag()'](https://github.com/utilForever/HellSolver/commit/f8fa97245cb23a831b4a17763d43394184b811b2)

-   SetLurker() → FlipLurkerFlag()
-   m_lurker → m_lurkerFlag
-   변수명을 짓는것도 조금 부족했던 것 같고, 내부적인 로직도 멤버만 불러와도 되는 것을 함수로 불러와서 오버헤드가 늘어나는 코드였던 것 같다.

## 7. [refactor: Change the name of method to 'ProcessUndeadObjects()'](https://github.com/utilForever/HellSolver/commit/c0ed51dd097e0d743cc221215a766f32a210eb0a)

-   CheckUndead() → ProcessUndeadObjects()
-   마찬가지로 간단하면서도 의미가 들어가게끔 함수명을 짜도록 하자.

## 8. [test: Separate unit tests by adding new files](https://github.com/utilForever/HellSolver/commit/6dac29653bb796b1832d322d1c599d769ba4ef68)

-   사실 테스트 쪼개는 법 몰랐다. 앞으로는 쪼개도록 하자.

## 9. [refactor: Replace 'Position' with struct and convert the usage of x/y](https://github.com/utilForever/HellSolver/commit/383a2bf9ac36c03173cf0ee2e3312b3290a3a8bb)

x, y가 코드 짜는 중에 한두번 바뀐 것 같은데, 아무래도 주석 처리를 안해둬서 서로 소통이 안되어 생긴 문제인 것 같다.

Position을 pair로 처리해야지라는 생각을 했는데 그러다보니 멤버를 .first, .second로 접근해야하기 때문에 코드를 짜면서도 뭔가 불편한 기분이였는데, 구조체로 x, y 짜듯이 하고 찍어내니 코드가 좀 이뻐지는 것 같다.

## 10. [refactor: Delete unnecessary code '\_\_main\_\_'](https://github.com/utilForever/HellSolver/commit/4b0b6deca9243afa17375687e834bde9fbd88d52)

pytest를 쓰는 법을 몰랐다. :q

## 11. [refactor: Rearrange the structure of project 'HellSolver'](https://github.com/utilForever/HellSolver/commit/4881fb5d3806bc2872c2abac94e50b6e977d9a2e)

```c++
Position m_startPos{ 0, 0 };
```

-   [집합 초기화 _Aggregate initialization_](https://en.cppreference.com/w/cpp/language/aggregate_initialization)
    -   Array, Class(typically, struct or union) without no private/protected/virtual members
    -   Static data memebers and unnamed bit-fields are skipped during aggregate initalization.

> 처음 코드를 짜봤는데 나름대로 로직 상에 문제가 발생한 것 같지는 않아서 뿌듯하다.  
> 또, C++과 CMake를 배워서 이만큼의 코드를 짜봤다는게 신기하기만 하다.
> 앞으로는 만들어진 API를 가지고 ML을 할테니 그거대로 나름 또 기대가 된다. :)
