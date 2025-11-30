// 임시 데이터 파일 (내용, 파일위치 수정 예정)
// 강의 정보를 저장해두는 파일

const allCourseData = {
    "spring-basic": {
      courseId: "spring-basic",
      title: "스프링 핵심 원리 - 기본편",
      instructor: "김영한",
      thumbnail: "../Images/spring.png",
      badge: "무제한 수강",
      price: 88000,
      sections: [
        {
          sectionId: "spring-sec1",
          title: "섹션 1: 인트로",
          info: "3강",
          lectures: [
            { lectureId: "spring-1", title: "1. 스프링 소개", time: "10:00", video: "../Videos/sample1.mp4" },
            { lectureId: "spring-2", title: "2. 스프링이란?", time: "12:00", video: "../Videos/sample1.mp4" },
            { lectureId: "spring-3", title: "3. 환경 설정", time: "08:00", video: "../Videos/sample1.mp4" }
          ]
        }
      ]
    },
  
    "c-basic": {
      courseId: "c-basic",
      title: "독하게 시작하는 C 프로그래밍",
      instructor: "널널한 개발자",
      thumbnail: "../Images/c.png",
      badge: "무제한 수강",
      price: 99000,
      sections: [
        {
          sectionId: "c-sec1",
          title: "섹션 1: 기초 문법",
          info: "3강",
          lectures: [
            { lectureId: "c-1", title: "1. C 언어 소개", time: "09:00", video: "../Videos/sample1.mp4" },
            { lectureId: "c-2", title: "2. 변수와 자료형", time: "11:00", video: "../Videos/sample1.mp4" },
            { lectureId: "c-3", title: "3. 조건문", time: "13:00", video: "../Videos/sample1.mp4" }
          ]
        }
      ]
    },
  
    "react-basic": {
      courseId: "react-basic",
      title: "한 입 크기로 잘라먹는 리액트",
      instructor: "이정한 Winterlood",
      thumbnail: "../Images/react.png",
      badge: "무제한 수강",
      price: 48400,
      sections: [
        {
          sectionId: "react-sec1",
          title: "리액트 입문",
          info: "3강",
          lectures: [
            { lectureId: "react-1", title: "1. 리액트 소개", time: "12:32", video: "../Videos/react1.mp4" },
            { lectureId: "react-2", title: "2. JSX란?", time: "10:20", video: "../Videos/react2.mp4" },
            { lectureId: "react-3", title: "3. 컴포넌트 기초", time: "14:11", video: "../Videos/react3.mp4" }
          ]
        }
      ]
    }
  };
  