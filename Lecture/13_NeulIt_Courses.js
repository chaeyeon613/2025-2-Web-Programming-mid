// 수정 예정

const allCourses = {

    "python-basic": {
      id: "python-basic",
      title: "프로그래밍 시작하기: 파이썬 입문",
      instructor: "NeulIT",
      price: 0,
      thumbnail: "../Images/python.png",
      badge: "무제한 수강",
      sections: [
        {
          sectionId: "py-sec1",
          title: "섹션 1. 입문하기",
          info: "3강",
          lectures: [
            { lectureId: "py-1", title: "파이썬 소개", time: "08:00", video: "../Videos/sample1.mp4" },
            { lectureId: "py-2", title: "설치하기", time: "10:00", video: "../Videos/sample1.mp4" },
            { lectureId: "py-3", title: "기초문법", time: "12:00", video: "../Videos/sample1.mp4" }
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
      sections: [
        {
          sectionId: "react-sec1",
          title: "리액트 기초",
          info: "3강",
          lectures: [
            { lectureId: "react-1", title: "React 소개", time: "12:00", video: "../Videos/react1.mp4" },
            { lectureId: "react-2", title: "JSX 이해하기", time: "10:00", video: "../Videos/react2.mp4" },
            { lectureId: "react-3", title: "컴포넌트 기본", time: "14:00", video: "../Videos/react3.mp4" }
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
      sections: [
        {
          sectionId: "spring-sec1",
          title: "스프링 기초",
          info: "3강",
          lectures: [
            { lectureId: "spring-1", title: "스프링이란?", time: "10:00", video: "../Videos/sample1.mp4" },
            { lectureId: "spring-2", title: "환경설정", time: "12:00", video: "../Videos/sample1.mp4" },
            { lectureId: "spring-3", title: "스프링 동작원리", time: "08:00", video: "../Videos/sample1.mp4" }
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
      sections: [
        {
          sectionId: "c-sec1",
          title: "C 기초",
          info: "3강",
          lectures: [
            { lectureId: "c-1", title: "C 소개", time: "09:00", video: "../Videos/sample1.mp4" },
            { lectureId: "c-2", title: "변수와 자료형", time: "11:00", video: "../Videos/sample1.mp4" },
            { lectureId: "c-3", title: "조건문", time: "13:00", video: "../Videos/sample1.mp4" }
          ]
        }
      ]
    },
  
    "html-css-basic": {
      id: "html-css-basic",
      title: "제대로 파는 HTML CSS",
      instructor: "얄팍한 코딩사전",
      price: 44000,
      thumbnail: "../Images/html+css.png",
      badge: "무제한 수강",
      sections: [
        {
          sectionId: "html-sec1",
          title: "HTML/CSS 기초",
          info: "3강",
          lectures: [
            { lectureId: "html-1", title: "HTML 기본", time: "08:00", video: "../Videos/sample1.mp4" },
            { lectureId: "html-2", title: "CSS 선택자", time: "12:00", video: "../Videos/sample1.mp4" },
            { lectureId: "html-3", title: "레이아웃 잡기", time: "15:00", video: "../Videos/sample1.mp4" }
          ]
        }
      ]
    },
  
    "kotlin-basic": {
      id: "kotlin-basic",
      title: "자바 개발자를 위한 코틀린 입문",
      instructor: "최태현",
      price: 55000,
      thumbnail: "../Images/kotlin.png",
      badge: "무제한 수강",
      sections: [
        {
          sectionId: "kt-sec1",
          title: "코틀린 기초",
          info: "3강",
          lectures: [
            { lectureId: "kt-1", title: "Kotlin 소개", time: "09:00", video: "../Videos/sample1.mp4" },
            { lectureId: "kt-2", title: "기본 문법", time: "12:00", video: "../Videos/sample1.mp4" },
            { lectureId: "kt-3", title: "클래스 기초", time: "14:00", video: "../Videos/sample1.mp4" }
          ]
        }
      ]
    },
  
    "cpp-basic": {
      id: "cpp-basic",
      title: "초보자를 위한 C++ 프로그래밍 기초 다지기",
      instructor: "유용한 IT 학습",
      price: 99000,
      thumbnail: "../Images/C++.png",
      badge: "무제한 수강",
      sections: [
        {
          sectionId: "cpp-sec1",
          title: "C++ 기본기",
          info: "3강",
          lectures: [
            { lectureId: "cpp-1", title: "C++ 소개", time: "09:00", video: "../Videos/sample1.mp4" },
            { lectureId: "cpp-2", title: "기초 문법", time: "13:00", video: "../Videos/sample1.mp4" },
            { lectureId: "cpp-3", title: "OOP 기초", time: "15:00", video: "../Videos/sample1.mp4" }
          ]
        }
      ]
    },
  
    "docker-basic": {
      id: "docker-basic",
      title: "비전공자도 이해할 수 있는 Docker 실전",
      instructor: "JSCODE 박재성",
      price: 77000,
      thumbnail: "../Images/docker.png",
      badge: "무제한 수강",
      sections: [
        {
          sectionId: "docker-sec1",
          title: "Docker 기본",
          info: "3강",
          lectures: [
            { lectureId: "docker-1", title: "Docker란?", time: "10:00", video: "../Videos/sample1.mp4" },
            { lectureId: "docker-2", title: "명령어 사용", time: "12:00", video: "../Videos/sample1.mp4" },
            { lectureId: "docker-3", title: "컨테이너 만들기", time: "20:00", video: "../Videos/sample1.mp4" }
          ]
        }
      ]
    },
  
    "db-basic": {
      id: "db-basic",
      title: "실전! 데이터베이스 완전 정복 [설계편]",
      instructor: "신동현",
      price: 77000,
      thumbnail: "../Images/database.png",
      badge: "무제한 수강",
      sections: [
        {
          sectionId: "db-sec1",
          title: "DB 설계 기본",
          info: "3강",
          lectures: [
            { lectureId: "db-1", title: "데이터 모델링", time: "10:00", video: "../Videos/sample1.mp4" },
            { lectureId: "db-2", title: "ERD 기초", time: "12:00", video: "../Videos/sample1.mp4" },
            { lectureId: "db-3", title: "정규화", time: "15:00", video: "../Videos/sample1.mp4" }
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
      sections: [
        {
          sectionId: "commerce-sec1",
          title: "커머스 백엔드 개론",
          info: "3강",
          lectures: [
            { lectureId: "commerce-1", title: "EC 기초", time: "12:00", video: "../Videos/sample1.mp4" },
            { lectureId: "commerce-2", title: "주문 구조", time: "15:00", video: "../Videos/sample1.mp4" },
            { lectureId: "commerce-3", title: "결제 흐름", time: "18:00", video: "../Videos/sample1.mp4" }
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
      sections: [
        {
          sectionId: "ai-sec1",
          title: "AI 자동화 기본",
          info: "3강",
          lectures: [
            { lectureId: "ai-1", title: "AI 자동화란?", time: "15:00", video: "../Videos/sample1.mp4" },
            { lectureId: "ai-2", title: "작업 자동화", time: "18:00", video: "../Videos/sample1.mp4" },
            { lectureId: "ai-3", title: "프로젝트 만들기", time: "20:00", video: "../Videos/sample1.mp4" }
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
      sections: [
        {
          sectionId: "bs-sec1",
          title: "반응형 웹 기초",
          info: "3강",
          lectures: [
            { lectureId: "bs-1", title: "Bootstrap 소개", time: "10:00", video: "../Videos/sample1.mp4" },
            { lectureId: "bs-2", title: "그리드 시스템", time: "12:00", video: "../Videos/sample1.mp4" },
            { lectureId: "bs-3", title: "컴포넌트 활용", time: "14:00", video: "../Videos/sample1.mp4" }
          ]
        }
      ]
    }
};

window.allCourses = allCourses;