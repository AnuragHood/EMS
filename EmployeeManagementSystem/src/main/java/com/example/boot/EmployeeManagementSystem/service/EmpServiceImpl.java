package com.example.boot.EmployeeManagementSystem.service;

import com.example.boot.EmployeeManagementSystem.bean.Employee;
import com.example.boot.EmployeeManagementSystem.repo.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpServiceImpl implements EmpService {
    @Autowired
    Repository repo;


    @Override
    public Iterable<Employee> getEmployees(Integer index1, Integer index2) {
        return repo.getEmployees(index1, index2);
    }

    @Override
    public Employee createEmployee(Employee employee) {

        return repo.save(employee);
    }

    @Override
    public String updateEmployee(Employee employee) {


        if (employee != null) {
            Optional<Employee> emp = repo.findById(employee.getId());
            if (emp.isPresent()) {
                emp.get().setFirstName(employee.getFirstName());
                emp.get().setLastName(employee.getLastName());
                emp.get().setInputAddress(employee.getInputAddress());
                emp.get().setInputAddress2(employee.getInputAddress2());
                emp.get().setInputPassword(employee.getInputPassword());
                emp.get().setInputCity(employee.getInputCity());
                emp.get().setInputEmail(employee.getInputEmail());
                emp.get().setInputState(employee.getInputState());
                emp.get().setInputZip(employee.getInputZip());
            }
            repo.save(emp.get());
            return "success";
        } else {
            return "fail";
        }


    }

    @Override
    public String deleteEmployee(Long id) {
        try {
            repo.deleteById(id);
            return "success";
        } catch (Exception e) {
            return (e.getMessage());
        }
    }


    @Override
    public Optional<Employee> getEmpById(Long id) {
        return repo.findById(id);

    }

    @Override
    public List<Employee> searchEmployee(String param, int index1, int index2) {
        return repo.searchEmp(param, index1, index2);
    }

    public String bulkUpload(String path) {
        return repo.bulkUpload(path);
    }

    @Override
    public Integer getRecordCount() {
        return repo.getRecordCount();
    }

    @Override
    public Integer getSearchRecordCount(String param) {
        return repo.getSearchRecordCount(param);
    }

}
