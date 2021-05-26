package com.exam.entity;

import lombok.Data;

import java.util.Date;

/**
 * @author PlutoWu
 * @date 2021/05/24
 */
@Data
public class ExamManage {
    private Integer examCode;

    private String description;

    private String source;

    private Integer paperId;

    private String examDate;

    private Integer totalTime;

    private String grade;

    private String term;

    private String major;

    private String institute;

    private Integer totalScore;

    private String type;

    private String tips;
    
    private Date startTime;

    private Date endTime;
}