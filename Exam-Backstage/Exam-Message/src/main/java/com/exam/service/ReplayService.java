package com.exam.service;

import com.exam.entity.Replay;

import java.util.List;

/**
 * @author PlutoWu
 * @date 2021/05/24
 */
public interface ReplayService {

    List<Replay> findAll();

    List<Replay> findAllById(Integer messageId);

    Replay findById(Integer replayId);

    int delete(Integer replayId);

    int update(Replay replay);

    int add(Replay replay);
}
