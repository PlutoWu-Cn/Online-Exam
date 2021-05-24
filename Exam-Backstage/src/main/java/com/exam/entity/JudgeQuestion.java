package com.exam.entity;

import lombok.Data;

/**
 * @author PlutoWu
 * @date 2021/05/24
 *///判断题实体类
@Data
public class JudgeQuestion {
    private Integer questionId;

    private String subject;

    private String question;

    private String answer;

    private String level;

    private String section;

    private Integer score;

    private String analysis; //题目解析
}