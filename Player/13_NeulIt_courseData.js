// 모든 강의 데이터 모음 (Lecture 폴더에 있는게 더 좋을 듯)
// 임시 - 수정 예정

const allCourseData = {

    "react-basic": {
        courseId: "react-basic",
        title: "한 입 크기로 잘라먹는 리액트",
        sections: [
            {
                sectionId: "sec1",
                title: "Intro",
                info: "3강",
                lectures: [
                    { lectureId: "react1", title: "1. 리액트 소개", time: "12:32", video: "../Videos/react1.mp4" },
                    { lectureId: "react2", title: "2. JSX란?", time: "10:20", video: "../Videos/react2.mp4" },
                    { lectureId: "react3", title: "3. 컴포넌트 기초", time: "14:11", video: "../Videos/react3.mp4" }
                ]
            }
        ]
    },

    "spring-basic": {
        courseId: "spring-basic",
        title: "스프링 완전 정복",
        sections: [
            {
                sectionId: "spring-sec1",
                title: "스프링 입문",
                info: "2강",
                lectures: [
                    { lectureId: "sp1", title: "1. 스프링 소개", time: "11:05", video: "../Videos/sp1.mp4" },
                    { lectureId: "sp2", title: "2. IoC란?", time: "13:40", video: "../Videos/sp2.mp4" }
                ]
            }
        ]
    },

    "c-basic": {
        courseId: "c-basic",
        title: "C 언어 기초 완성",
        sections: [
            {
                sectionId: "c-sec1",
                title: "C언어 기본",
                info: "2강",
                lectures: [
                    { lectureId: "c1", title: "1. C 시작하기", time: "07:33", video: "../Videos/c1.mp4" },
                    { lectureId: "c2", title: "2. 변수와 타입", time: "08:44", video: "../Videos/c2.mp4" }
                ]
            }
        ]
    }

};
