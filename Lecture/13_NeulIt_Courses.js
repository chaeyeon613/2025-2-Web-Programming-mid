const allCourses = {

  "python-basic": {
    id: "python-basic",
    title: "프로그래밍 시작하기: 파이썬 입문",
    instructor: "NeulIT",
    price: 0,
    thumbnail: "../Images/python.png",
    badge: "무제한 수강",
    tags: ["Python"],
    sections: [
      {
        sectionId: "python-sec1",
        title: "섹션 1. 들어가며",
        info: "1강",
        lectures: [
          { lectureId: "python-1", title: "1. 강의 및 강사 소개", time: "08:09", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "python-sec2",
        title: "섹션 2. JavaScript 기본",
        info: "3강",
        lectures: [
          { lectureId: "python-2", title: "4. 1.1) 안녕 자바스크립트", time: "07:23", video: "../Images/sample.mp4" },
          { lectureId: "python-3", title: "5. 1.2) VsCode 설치하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "python-4", title: "6. 1.3) 자바스크립트 실습 환경 설정하기", time: "07:16", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "python-sec3",
        title: "섹션 3. JavaScript 심화",
        info: "4강",
        lectures: [
          { lectureId: "python-5", title: "7. 3.1) Truthy와 Falsy", time: "10:12", video: "../Images/sample.mp4" },
          { lectureId: "python-6", title: "8. 3.2) 단락 평가", time: "12:30", video: "../Images/sample.mp4" },
          { lectureId: "python-7", title: "9. 3.3) 구조분해할당", time: "07:40", video: "../Images/sample.mp4" },
          { lectureId: "python-8", title: "10. 3.4) Spread 연산자와 Rest 매개변수", time: "07:57", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "python-sec4",
        title: "섹션 4. Node.js 기초",
        info: "3강",
        lectures: [
          { lectureId: "python-9", title: "10. 4.1) Node.js를 소개합니다", time: "05:09", video: "../Images/sample.mp4" },
          { lectureId: "python-10", title: "11. 4.2) Node.js 설치하기", time: "07:26", video: "../Images/sample.mp4" },
          { lectureId: "python-11", title: "12. 4.3) Node.js 모듈 시스템 이해하기", time: "14:42", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "python-sec5",
        title: "섹션 5. React.js 개론",
        info: "3강",
        lectures: [
          { lectureId: "python-12", title: "13. 5.1) React.js를 소개합니다", time: "21:30", video: "../Images/sample.mp4" },
          { lectureId: "python-13", title: "13. 5.2) 첫 React App 생성하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "python-14", title: "13. 5.3) React App 구동원리 살펴보기", time: "10:28", video: "../Images/sample.mp4" }
        ]
      }
    ]
  },

  "react-basic": {
    id: "react-basic",
    title: "한 입 크기로 잘라 먹는 리액트(React.js)",
    instructor: "이정환",
    price: 44000,
    thumbnail: "../Images/react.png",
    badge: "무제한 수강",
    tags: ["React"],
    sections: [
      {
        sectionId: "react-sec1",
        title: "섹션 1. 들어가며",
        info: "1강",
        lectures: [
          { lectureId: "react-1", title: "1. 강의 및 강사 소개", time: "08:09", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "react-sec2",
        title: "섹션 2. JavaScript 기본",
        info: "3강",
        lectures: [
          { lectureId: "react-2", title: "4. 1.1) 안녕 자바스크립트", time: "07:23", video: "../Images/sample.mp4" },
          { lectureId: "react-3", title: "5. 1.2) VsCode 설치하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "react-4", title: "6. 1.3) 자바스크립트 실습 환경 설정하기", time: "07:16", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "react-sec3",
        title: "섹션 3. JavaScript 심화",
        info: "4강",
        lectures: [
          { lectureId: "react-5", title: "7. 3.1) Truthy와 Falsy", time: "10:12", video: "../Images/sample.mp4" },
          { lectureId: "react-6", title: "8. 3.2) 단락 평가", time: "12:30", video: "../Images/sample.mp4" },
          { lectureId: "react-7", title: "9. 3.3) 구조분해할당", time: "07:40", video: "../Images/sample.mp4" },
          { lectureId: "react-8", title: "10. 3.4) Spread 연산자와 Rest 매개변수", time: "07:57", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "react-sec4",
        title: "섹션 4. Node.js 기초",
        info: "3강",
        lectures: [
          { lectureId: "react-9", title: "10. 4.1) Node.js를 소개합니다", time: "05:09", video: "../Images/sample.mp4" },
          { lectureId: "react-10", title: "11. 4.2) Node.js 설치하기", time: "07:26", video: "../Images/sample.mp4" },
          { lectureId: "react-11", title: "12. 4.3) Node.js 모듈 시스템 이해하기", time: "14:42", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "react-sec5",
        title: "섹션 5. React.js 개론",
        info: "3강",
        lectures: [
          { lectureId: "react-12", title: "13. 5.1) React.js를 소개합니다", time: "21:30", video: "../Images/sample.mp4" },
          { lectureId: "react-13", title: "13. 5.2) 첫 React App 생성하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "react-14", title: "13. 5.3) React App 구동원리 살펴보기", time: "10:28", video: "../Images/sample.mp4" }
        ]
      }
    ]
  },

  "spring-basic": {
    id: "spring-basic",
    title: "스프링 핵심 원리 - 기본편",
    instructor: "김영한",
    price: 88000,
    thumbnail: "../Images/spring.png",
    badge: "무제한 수강",
    tags: ["Spring"],
    sections: [
      {
        sectionId: "spring-sec1",
        title: "섹션 1. 들어가며",
        info: "1강",
        lectures: [
          { lectureId: "spring-1", title: "1. 강의 및 강사 소개", time: "08:09", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "spring-sec2",
        title: "섹션 2. JavaScript 기본",
        info: "3강",
        lectures: [
          { lectureId: "spring-2", title: "4. 1.1) 안녕 자바스크립트", time: "07:23", video: "../Images/sample.mp4" },
          { lectureId: "spring-3", title: "5. 1.2) VsCode 설치하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "spring-4", title: "6. 1.3) 자바스크립트 실습 환경 설정하기", time: "07:16", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "spring-sec3",
        title: "섹션 3. JavaScript 심화",
        info: "4강",
        lectures: [
          { lectureId: "spring-5", title: "7. 3.1) Truthy와 Falsy", time: "10:12", video: "../Images/sample.mp4" },
          { lectureId: "spring-6", title: "8. 3.2) 단락 평가", time: "12:30", video: "../Images/sample.mp4" },
          { lectureId: "spring-7", title: "9. 3.3) 구조분해할당", time: "07:40", video: "../Images/sample.mp4" },
          { lectureId: "spring-8", title: "10. 3.4) Spread 연산자와 Rest 매개변수", time: "07:57", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "spring-sec4",
        title: "섹션 4. Node.js 기초",
        info: "3강",
        lectures: [
          { lectureId: "spring-9", title: "10. 4.1) Node.js를 소개합니다", time: "05:09", video: "../Images/sample.mp4" },
          { lectureId: "spring-10", title: "11. 4.2) Node.js 설치하기", time: "07:26", video: "../Images/sample.mp4" },
          { lectureId: "spring-11", title: "12. 4.3) Node.js 모듈 시스템 이해하기", time: "14:42", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "spring-sec5",
        title: "섹션 5. spring.js 개론",
        info: "3강",
        lectures: [
          { lectureId: "spring-12", title: "13. 5.1) React.js를 소개합니다", time: "21:30", video: "../Images/sample.mp4" },
          { lectureId: "spring-13", title: "13. 5.2) 첫 React App 생성하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "spring-14", title: "13. 5.3) React App 구동원리 살펴보기", time: "10:28", video: "../Images/sample.mp4" }
        ]
      }
    ]
  },

  "c-basic": {
    id: "c-basic",
    title: "독하게 시작하는 C 프로그래밍",
    instructor: "널널한 개발자T",
    price: 99000,
    thumbnail: "../Images/c.png",
    badge: "무제한 수강",
    tags: ["C"],
    sections: [
      {
        sectionId: "c-sec1",
        title: "섹션 1. 들어가며",
        info: "1강",
        lectures: [
          { lectureId: "c-1", title: "1. 강의 및 강사 소개", time: "08:09", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "c-sec2",
        title: "섹션 2. JavaScript 기본",
        info: "3강",
        lectures: [
          { lectureId: "c-2", title: "4. 1.1) 안녕 자바스크립트", time: "07:23", video: "../Images/sample.mp4" },
          { lectureId: "c-3", title: "5. 1.2) VsCode 설치하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "c-4", title: "6. 1.3) 자바스크립트 실습 환경 설정하기", time: "07:16", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "c-sec3",
        title: "섹션 3. JavaScript 심화",
        info: "4강",
        lectures: [
          { lectureId: "c-5", title: "7. 3.1) Truthy와 Falsy", time: "10:12", video: "../Images/sample.mp4" },
          { lectureId: "c-6", title: "8. 3.2) 단락 평가", time: "12:30", video: "../Images/sample.mp4" },
          { lectureId: "c-7", title: "9. 3.3) 구조분해할당", time: "07:40", video: "../Images/sample.mp4" },
          { lectureId: "c-8", title: "10. 3.4) Spread 연산자와 Rest 매개변수", time: "07:57", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "c-sec4",
        title: "섹션 4. Node.js 기초",
        info: "3강",
        lectures: [
          { lectureId: "c-9", title: "10. 4.1) Node.js를 소개합니다", time: "05:09", video: "../Images/sample.mp4" },
          { lectureId: "c-10", title: "11. 4.2) Node.js 설치하기", time: "07:26", video: "../Images/sample.mp4" },
          { lectureId: "c-11", title: "12. 4.3) Node.js 모듈 시스템 이해하기", time: "14:42", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "c-sec5",
        title: "섹션 5. React.js 개론",
        info: "3강",
        lectures: [
          { lectureId: "c-12", title: "13. 5.1) React.js를 소개합니다", time: "21:30", video: "../Images/sample.mp4" },
          { lectureId: "c-13", title: "13. 5.2) 첫 React App 생성하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "c-14", title: "13. 5.3) React App 구동원리 살펴보기", time: "10:28", video: "../Images/sample.mp4" }
        ]
      }
    ]
  },

  "html-css-basic": {
    id: "html-css-basic",
    title: "제대로 파는 HTML CSS",
    instructor: "얄팍한 코딩사전",
    price: 44000,
    thumbnail: "../Images/spring.png",
    badge: "무제한 수강",
    tags: ["HTML", "CSS", "JavaScript"],
    sections: [
      {
        sectionId: "html-sec1",
        title: "섹션 1. 들어가며",
        info: "1강",
        lectures: [
          { lectureId: "html-1", title: "1. 강의 및 강사 소개", time: "08:09", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "html-sec2",
        title: "섹션 2. JavaScript 기본",
        info: "3강",
        lectures: [
          { lectureId: "html-2", title: "4. 1.1) 안녕 자바스크립트", time: "07:23", video: "../Images/sample.mp4" },
          { lectureId: "html-3", title: "5. 1.2) VsCode 설치하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "html-4", title: "6. 1.3) 자바스크립트 실습 환경 설정하기", time: "07:16", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "html-sec3",
        title: "섹션 3. JavaScript 심화",
        info: "4강",
        lectures: [
          { lectureId: "html-5", title: "7. 3.1) Truthy와 Falsy", time: "10:12", video: "../Images/sample.mp4" },
          { lectureId: "html-6", title: "8. 3.2) 단락 평가", time: "12:30", video: "../Images/sample.mp4" },
          { lectureId: "html-7", title: "9. 3.3) 구조분해할당", time: "07:40", video: "../Images/sample.mp4" },
          { lectureId: "html-8", title: "10. 3.4) Spread 연산자와 Rest 매개변수", time: "07:57", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "html-sec4",
        title: "섹션 4. Node.js 기초",
        info: "3강",
        lectures: [
          { lectureId: "html-9", title: "10. 4.1) Node.js를 소개합니다", time: "05:09", video: "../Images/sample.mp4" },
          { lectureId: "html-10", title: "11. 4.2) Node.js 설치하기", time: "07:26", video: "../Images/sample.mp4" },
          { lectureId: "html-11", title: "12. 4.3) Node.js 모듈 시스템 이해하기", time: "14:42", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "html-sec5",
        title: "섹션 5. React.js 개론",
        info: "3강",
        lectures: [
          { lectureId: "html-12", title: "13. 5.1) React.js를 소개합니다", time: "21:30", video: "../Images/sample.mp4" },
          { lectureId: "html-13", title: "13. 5.2) 첫 React App 생성하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "html-14", title: "13. 5.3) React App 구동원리 살펴보기", time: "10:28", video: "../Images/sample.mp4" }
        ]
      }
    ]
  },

  "kotlin-basic": {
    id: "kotlin-basic",
    title: "자바 개발자를 위한 코틀린 입문",
    instructor: "최태현",
    price: 55000,
    thumbnail: "../Images/ai.png",
    badge: "무제한 수강",
    tags: ["Kotlin"],
    sections: [
      {
        sectionId: "kotlin-sec1",
        title: "섹션 1. 들어가며",
        info: "1강",
        lectures: [
          { lectureId: "kotlin-1", title: "1. 강의 및 강사 소개", time: "08:09", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "kotlin-sec2",
        title: "섹션 2. JavaScript 기본",
        info: "3강",
        lectures: [
          { lectureId: "kotlin-2", title: "4. 1.1) 안녕 자바스크립트", time: "07:23", video: "../Images/sample.mp4" },
          { lectureId: "kotlin-3", title: "5. 1.2) VsCode 설치하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "kotlin-4", title: "6. 1.3) 자바스크립트 실습 환경 설정하기", time: "07:16", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "kotlin-sec3",
        title: "섹션 3. JavaScript 심화",
        info: "4강",
        lectures: [
          { lectureId: "kotlin-5", title: "7. 3.1) Truthy와 Falsy", time: "10:12", video: "../Images/sample.mp4" },
          { lectureId: "kotlin-6", title: "8. 3.2) 단락 평가", time: "12:30", video: "../Images/sample.mp4" },
          { lectureId: "kotlin-7", title: "9. 3.3) 구조분해할당", time: "07:40", video: "../Images/sample.mp4" },
          { lectureId: "kotlin-8", title: "10. 3.4) Spread 연산자와 Rest 매개변수", time: "07:57", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "kotlin-sec4",
        title: "섹션 4. Node.js 기초",
        info: "3강",
        lectures: [
          { lectureId: "kotlin-9", title: "10. 4.1) Node.js를 소개합니다", time: "05:09", video: "../Images/sample.mp4" },
          { lectureId: "kotlin-10", title: "11. 4.2) Node.js 설치하기", time: "07:26", video: "../Images/sample.mp4" },
          { lectureId: "kotlin-11", title: "12. 4.3) Node.js 모듈 시스템 이해하기", time: "14:42", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "kotlin-sec5",
        title: "섹션 5. React.js 개론",
        info: "3강",
        lectures: [
          { lectureId: "kotlin-12", title: "13. 5.1) React.js를 소개합니다", time: "21:30", video: "../Images/sample.mp4" },
          { lectureId: "kotlin-13", title: "13. 5.2) 첫 React App 생성하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "kotlin-14", title: "13. 5.3) React App 구동원리 살펴보기", time: "10:28", video: "../Images/sample.mp4" }
        ]
      }
    ]
  },

  "cpp-basic": {
    id: "cpp-basic",
    title: "초보자를 위한 C++ 프로그래밍 기초 다지기",
    instructor: "유용한 IT 학습",
    price: 99000,
    thumbnail: "../Images/c.png",
    badge: "무제한 수강",
    tags: ["C++"],
    sections: [
      {
        sectionId: "cpp-sec1",
        title: "섹션 1. 들어가며",
        info: "1강",
        lectures: [
          { lectureId: "cpp-1", title: "1. 강의 및 강사 소개", time: "08:09", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "cpp-sec2",
        title: "섹션 2. JavaScript 기본",
        info: "3강",
        lectures: [
          { lectureId: "cpp-2", title: "4. 1.1) 안녕 자바스크립트", time: "07:23", video: "../Images/sample.mp4" },
          { lectureId: "cpp-3", title: "5. 1.2) VsCode 설치하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "cpp-4", title: "6. 1.3) 자바스크립트 실습 환경 설정하기", time: "07:16", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "cpp-sec3",
        title: "섹션 3. JavaScript 심화",
        info: "4강",
        lectures: [
          { lectureId: "cpp-5", title: "7. 3.1) Truthy와 Falsy", time: "10:12", video: "../Images/sample.mp4" },
          { lectureId: "cpp-6", title: "8. 3.2) 단락 평가", time: "12:30", video: "../Images/sample.mp4" },
          { lectureId: "cpp-7", title: "9. 3.3) 구조분해할당", time: "07:40", video: "../Images/sample.mp4" },
          { lectureId: "cpp-8", title: "10. 3.4) Spread 연산자와 Rest 매개변수", time: "07:57", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "cpp-sec4",
        title: "섹션 4. Node.js 기초",
        info: "3강",
        lectures: [
          { lectureId: "cpp-9", title: "10. 4.1) Node.js를 소개합니다", time: "05:09", video: "../Images/sample.mp4" },
          { lectureId: "cpp-10", title: "11. 4.2) Node.js 설치하기", time: "07:26", video: "../Images/sample.mp4" },
          { lectureId: "cpp-11", title: "12. 4.3) Node.js 모듈 시스템 이해하기", time: "14:42", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "cpp-sec5",
        title: "섹션 5. cpp.js 개론",
        info: "3강",
        lectures: [
          { lectureId: "cpp-12", title: "13. 5.1) React.js를 소개합니다", time: "21:30", video: "../Images/sample.mp4" },
          { lectureId: "cpp-13", title: "13. 5.2) 첫 React App 생성하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "cpp-14", title: "13. 5.3) React App 구동원리 살펴보기", time: "10:28", video: "../Images/sample.mp4" }
        ]
      }
    ]
  },

  "docker-basic": {
    id: "docker-basic",
    title: "비전공자도 이해할 수 있는 Docker 실전",
    instructor: "JSCODE 박재성",
    price: 77000,
    thumbnail: "../Images/react.png",
    badge: "무제한 수강",
    tags: ["Docker"],
    sections: [
      {
        sectionId: "docker-sec1",
        title: "섹션 1. 들어가며",
        info: "1강",
        lectures: [
          { lectureId: "docker-1", title: "1. 강의 및 강사 소개", time: "08:09", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "docker-sec2",
        title: "섹션 2. JavaScript 기본",
        info: "3강",
        lectures: [
          { lectureId: "docker-2", title: "4. 1.1) 안녕 자바스크립트", time: "07:23", video: "../Images/sample.mp4" },
          { lectureId: "docker-3", title: "5. 1.2) VsCode 설치하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "docker-4", title: "6. 1.3) 자바스크립트 실습 환경 설정하기", time: "07:16", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "docker-sec3",
        title: "섹션 3. JavaScript 심화",
        info: "4강",
        lectures: [
          { lectureId: "docker-5", title: "7. 3.1) Truthy와 Falsy", time: "10:12", video: "../Images/sample.mp4" },
          { lectureId: "docker-6", title: "8. 3.2) 단락 평가", time: "12:30", video: "../Images/sample.mp4" },
          { lectureId: "docker-7", title: "9. 3.3) 구조분해할당", time: "07:40", video: "../Images/sample.mp4" },
          { lectureId: "docker-8", title: "10. 3.4) Spread 연산자와 Rest 매개변수", time: "07:57", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "docker-sec4",
        title: "섹션 4. Node.js 기초",
        info: "3강",
        lectures: [
          { lectureId: "docker-9", title: "10. 4.1) Node.js를 소개합니다", time: "05:09", video: "../Images/sample.mp4" },
          { lectureId: "docker-10", title: "11. 4.2) Node.js 설치하기", time: "07:26", video: "../Images/sample.mp4" },
          { lectureId: "docker-11", title: "12. 4.3) Node.js 모듈 시스템 이해하기", time: "14:42", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "docker-sec5",
        title: "섹션 5. React.js 개론",
        info: "3강",
        lectures: [
          { lectureId: "docker-12", title: "13. 5.1) React.js를 소개합니다", time: "21:30", video: "../Images/sample.mp4" },
          { lectureId: "docker-13", title: "13. 5.2) 첫 React App 생성하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "docker-14", title: "13. 5.3) React App 구동원리 살펴보기", time: "10:28", video: "../Images/sample.mp4" }
        ]
      }
    ]
  },

  "db-basic": {
    id: "db-basic",
    title: "실전! 데이터베이스 완전 정복 [설계편]",
    instructor: "신동현",
    price: 77000,
    thumbnail: "../Images/react.png",
    badge: "무제한 수강",
    tags: ["DB"],
    sections: [
      {
        sectionId: "db-sec1",
        title: "섹션 1. 들어가며",
        info: "1강",
        lectures: [
          { lectureId: "db-1", title: "1. 강의 및 강사 소개", time: "08:09", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "db-sec2",
        title: "섹션 2. JavaScript 기본",
        info: "3강",
        lectures: [
          { lectureId: "db-2", title: "4. 1.1) 안녕 자바스크립트", time: "07:23", video: "../Images/sample.mp4" },
          { lectureId: "db-3", title: "5. 1.2) VsCode 설치하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "db-4", title: "6. 1.3) 자바스크립트 실습 환경 설정하기", time: "07:16", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "db-sec3",
        title: "섹션 3. JavaScript 심화",
        info: "4강",
        lectures: [
          { lectureId: "db-5", title: "7. 3.1) Truthy와 Falsy", time: "10:12", video: "../Images/sample.mp4" },
          { lectureId: "db-6", title: "8. 3.2) 단락 평가", time: "12:30", video: "../Images/sample.mp4" },
          { lectureId: "db-7", title: "9. 3.3) 구조분해할당", time: "07:40", video: "../Images/sample.mp4" },
          { lectureId: "db-8", title: "10. 3.4) Spread 연산자와 Rest 매개변수", time: "07:57", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "db-sec4",
        title: "섹션 4. Node.js 기초",
        info: "3강",
        lectures: [
          { lectureId: "db-9", title: "10. 4.1) Node.js를 소개합니다", time: "05:09", video: "../Images/sample.mp4" },
          { lectureId: "db-10", title: "11. 4.2) Node.js 설치하기", time: "07:26", video: "../Images/sample.mp4" },
          { lectureId: "db-11", title: "12. 4.3) Node.js 모듈 시스템 이해하기", time: "14:42", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "db-sec5",
        title: "섹션 5. React.js 개론",
        info: "3강",
        lectures: [
          { lectureId: "db-12", title: "13. 5.1) React.js를 소개합니다", time: "21:30", video: "../Images/sample.mp4" },
          { lectureId: "db-13", title: "13. 5.2) 첫 React App 생성하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "db-14", title: "13. 5.3) React App 구동원리 살펴보기", time: "10:28", video: "../Images/sample.mp4" }
        ]
      }
    ]
  },

  "commerce-basic": {
    id: "commerce-basic",
    title: "제미니의 개발실무 - 커머스 백엔드 기본편",
    instructor: "신동현",
    price: 77000,
    thumbnail: "../Images/c.png",
    badge: "무제한 수강",
    tags: ["Backend"],
    sections: [
      {
        sectionId: "commerce-sec1",
        title: "섹션 1. 들어가며",
        info: "1강",
        lectures: [
          { lectureId: "commerce-1", title: "1. 강의 및 강사 소개", time: "08:09", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "commerce-sec2",
        title: "섹션 2. JavaScript 기본",
        info: "3강",
        lectures: [
          { lectureId: "commerce-2", title: "4. 1.1) 안녕 자바스크립트", time: "07:23", video: "../Images/sample.mp4" },
          { lectureId: "commerce-3", title: "5. 1.2) VsCode 설치하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "commerce-4", title: "6. 1.3) 자바스크립트 실습 환경 설정하기", time: "07:16", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "commerce-sec3",
        title: "섹션 3. JavaScript 심화",
        info: "4강",
        lectures: [
          { lectureId: "commerce-5", title: "7. 3.1) Truthy와 Falsy", time: "10:12", video: "../Images/sample.mp4" },
          { lectureId: "commerce-6", title: "8. 3.2) 단락 평가", time: "12:30", video: "../Images/sample.mp4" },
          { lectureId: "commerce-7", title: "9. 3.3) 구조분해할당", time: "07:40", video: "../Images/sample.mp4" },
          { lectureId: "commerce-8", title: "10. 3.4) Spread 연산자와 Rest 매개변수", time: "07:57", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "commerce-sec4",
        title: "섹션 4. Node.js 기초",
        info: "3강",
        lectures: [
          { lectureId: "commerce-9", title: "10. 4.1) Node.js를 소개합니다", time: "05:09", video: "../Images/sample.mp4" },
          { lectureId: "commerce-10", title: "11. 4.2) Node.js 설치하기", time: "07:26", video: "../Images/sample.mp4" },
          { lectureId: "commerce-11", title: "12. 4.3) Node.js 모듈 시스템 이해하기", time: "14:42", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "commerce-sec5",
        title: "섹션 5. React.js 개론",
        info: "3강",
        lectures: [
          { lectureId: "commerce-12", title: "13. 5.1) React.js를 소개합니다", time: "21:30", video: "../Images/sample.mp4" },
          { lectureId: "commerce-13", title: "13. 5.2) 첫 React App 생성하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "commerce-14", title: "13. 5.3) React App 구동원리 살펴보기", time: "10:28", video: "../Images/sample.mp4" }
        ]
      }
    ]
  },

  "ai-basic": {
    id: "ai-basic",
    title: "코딩 없이 AI 자동화 전문가가 되는 법",
    instructor: "남박사",
    price: 51150,
    thumbnail: "../Images/ai.png",
    badge: "무제한 수강",
    tags: ["AI"],
    sections: [
      {
        sectionId: "ai-sec1",
        title: "섹션 1. 들어가며",
        info: "1강",
        lectures: [
          { lectureId: "ai-1", title: "1. 강의 및 강사 소개", time: "08:09", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "ai-sec2",
        title: "섹션 2. JavaScript 기본",
        info: "3강",
        lectures: [
          { lectureId: "ai-2", title: "4. 1.1) 안녕 자바스크립트", time: "07:23", video: "../Images/sample.mp4" },
          { lectureId: "ai-3", title: "5. 1.2) VsCode 설치하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "ai-4", title: "6. 1.3) 자바스크립트 실습 환경 설정하기", time: "07:16", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "ai-sec3",
        title: "섹션 3. JavaScript 심화",
        info: "4강",
        lectures: [
          { lectureId: "ai-5", title: "7. 3.1) Truthy와 Falsy", time: "10:12", video: "../Images/sample.mp4" },
          { lectureId: "ai-6", title: "8. 3.2) 단락 평가", time: "12:30", video: "../Images/sample.mp4" },
          { lectureId: "ai-7", title: "9. 3.3) 구조분해할당", time: "07:40", video: "../Images/sample.mp4" },
          { lectureId: "ai-8", title: "10. 3.4) Spread 연산자와 Rest 매개변수", time: "07:57", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "ai-sec4",
        title: "섹션 4. Node.js 기초",
        info: "3강",
        lectures: [
          { lectureId: "ai-9", title: "10. 4.1) Node.js를 소개합니다", time: "05:09", video: "../Images/sample.mp4" },
          { lectureId: "ai-10", title: "11. 4.2) Node.js 설치하기", time: "07:26", video: "../Images/sample.mp4" },
          { lectureId: "ai-11", title: "12. 4.3) Node.js 모듈 시스템 이해하기", time: "14:42", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "ai-sec5",
        title: "섹션 5. React.js 개론",
        info: "3강",
        lectures: [
          { lectureId: "ai-12", title: "13. 5.1) React.js를 소개합니다", time: "21:30", video: "../Images/sample.mp4" },
          { lectureId: "ai-13", title: "13. 5.2) 첫 React App 생성하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "ai-14", title: "13. 5.3) React App 구동원리 살펴보기", time: "10:28", video: "../Images/sample.mp4" }
        ]
      }
    ]
  },

  "bootstrap-basic": {
    id: "bootstrap-basic",
    title: "부트스트랩을 활용한 반응형 웹제작",
    instructor: "영코디 킴쌤",
    price: 29700,
    thumbnail: "../Images/python.png",
    badge: "무제한 수강",
    tags: ["BootStrap"],
    sections: [
      {
        sectionId: "bootstrap-sec1",
        title: "섹션 1. 들어가며",
        info: "1강",
        lectures: [
          { lectureId: "bootstrap-1", title: "1. 강의 및 강사 소개", time: "08:09", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "bootstrap-sec2",
        title: "섹션 2. JavaScript 기본",
        info: "3강",
        lectures: [
          { lectureId: "bootstrap-2", title: "4. 1.1) 안녕 자바스크립트", time: "07:23", video: "../Images/sample.mp4" },
          { lectureId: "bootstrap-3", title: "5. 1.2) VsCode 설치하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "bootstrap-4", title: "6. 1.3) 자바스크립트 실습 환경 설정하기", time: "07:16", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "bootstrap-sec3",
        title: "섹션 3. JavaScript 심화",
        info: "4강",
        lectures: [
          { lectureId: "bootstrap-5", title: "7. 3.1) Truthy와 Falsy", time: "10:12", video: "../Images/sample.mp4" },
          { lectureId: "bootstrap-6", title: "8. 3.2) 단락 평가", time: "12:30", video: "../Images/sample.mp4" },
          { lectureId: "bootstrap-7", title: "9. 3.3) 구조분해할당", time: "07:40", video: "../Images/sample.mp4" },
          { lectureId: "bootstrap-8", title: "10. 3.4) Spread 연산자와 Rest 매개변수", time: "07:57", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "bootstrap-sec4",
        title: "섹션 4. Node.js 기초",
        info: "3강",
        lectures: [
          { lectureId: "bootstrap-9", title: "10. 4.1) Node.js를 소개합니다", time: "05:09", video: "../Images/sample.mp4" },
          { lectureId: "bootstrap-10", title: "11. 4.2) Node.js 설치하기", time: "07:26", video: "../Images/sample.mp4" },
          { lectureId: "bootstrap-11", title: "12. 4.3) Node.js 모듈 시스템 이해하기", time: "14:42", video: "../Images/sample.mp4" }
        ]
      },
      {
        sectionId: "bootstrap-sec5",
        title: "섹션 5. React.js 개론",
        info: "3강",
        lectures: [
          { lectureId: "bootstrap-12", title: "13. 5.1) React.js를 소개합니다", time: "21:30", video: "../Images/sample.mp4" },
          { lectureId: "bootstrap-13", title: "13. 5.2) 첫 React App 생성하기", time: "10:26", video: "../Images/sample.mp4" },
          { lectureId: "bootstrap-14", title: "13. 5.3) React App 구동원리 살펴보기", time: "10:28", video: "../Images/sample.mp4" }
        ]
      }
    ]
  }
};

window.allCourses = allCourses;