package com.exam.service;

import com.exam.entity.Admin;

import java.util.List;

/**
 * @author PlutoWu
 * @date 2021/05/24
 */
public interface AdminService{

    public List<Admin> findAll();

    public Admin findById(Integer adminId);

    public int deleteById(int adminId);

    public int update(Admin admin);

    public int add(Admin admin);
}
