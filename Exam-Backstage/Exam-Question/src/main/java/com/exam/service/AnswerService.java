package com.exam.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.exam.vo.AnswerVO;

/**
 * @author PlutoWu
 * @date 2021/05/24
 */
public interface AnswerService {

    IPage<AnswerVO> findAll(Page<AnswerVO> page);
}
