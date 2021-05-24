package com.exam.entity;

import lombok.Data;

/**
 * @author PlutoWu
 * @date 2021/05/24
 */
@Data
public class Teacher {
    private Integer teacherId;

    private String teacherName;

    private String institute;

    private String sex;

    private String tel;

    private String email;

    private String pwd;

    private String cardId;

    private String type;

    private String role;
}