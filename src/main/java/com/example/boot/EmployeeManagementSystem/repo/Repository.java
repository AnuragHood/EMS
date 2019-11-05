package com.example.boot.EmployeeManagementSystem.repo;

import com.example.boot.EmployeeManagementSystem.bean.Employee;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface Repository extends CrudRepository<Employee, Long>, EntityManagerRepo {
    @Query(value = "SELECT * FROM Employee WHERE first_name like %:param% OR last_name like %:param% OR id like " +
			"%:param% Limit :index1,:index2", nativeQuery = true)
    List<Employee> searchEmp(@Param("param") String param, @Param("index1") int index1, @Param("index2") int index2);

    @Query(value = "SELECT * FROM Employee LIMIT ?,?", nativeQuery = true)
    List<Employee> getEmployees(int index1, int index2);

    @Query(value = "SELECT count(*) from Employee", nativeQuery = true)
    Integer getRecordCount();

    @Query(value = "SELECT count(*) FROM Employee WHERE first_name like %:param% OR last_name like %:param% OR id " +
			"like %:param%", nativeQuery = true)
    Integer getSearchRecordCount(@Param("param") String param);
}
