package com.exam.entity;

import lombok.Data;

/**
 * @author PlutoWu
 * @date 2021/05/24
 */
@Data
public class Score {
    private Integer examCode;

    private Integer studentId;

    private String subject;

    private Integer ptScore;

    private Integer etScore;

    private Integer score;

    private Integer scoreId;

    private String answerDate;
}