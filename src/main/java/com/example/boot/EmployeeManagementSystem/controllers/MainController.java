package com.example.boot.EmployeeManagementSystem.controllers;

import com.example.boot.EmployeeManagementSystem.bean.Employee;
import com.example.boot.EmployeeManagementSystem.service.EmpServiceImpl;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Controller
public class MainController {
    private static Logger logger = LogManager.getLogger(MainController.class);
    @Autowired
    EmpServiceImpl service;
    Employee emp = new Employee();

    @GetMapping("/")
    public ModelAndView addEmployee() {
        logger.info("inside show method GET......>>>");
        return new ModelAndView("home");
    }

    @PostMapping("/addEmp")
    @ResponseBody
    public String addEmp(@RequestBody Employee employee) {
        try {

            logger.info("inside   addEmp method......>>>" + employee.getFirstName() + " " + employee.toString());
            if (employee.getUpdateFlag().equalsIgnoreCase("update")) {
                logger.info("success updating emp.." + service.updateEmployee(employee));
                service.updateEmployee(employee);
            } else {
                service.createEmployee(employee);

                logger.info("success adding emp.." + service.createEmployee(employee));
            }
            return "success";
        } catch (Exception e) {
            logger.info("adding employee failed:" + e);
            return e.getMessage();
        }

    }

    @GetMapping("/getEmp")
    @ResponseBody
    public List<Employee> getEmp(@RequestParam Integer index1, @RequestParam Integer index2) {
        try {
            logger.info("inside getEmp method......>>>");

            logger.info("success adding emp..." + (List<Employee>) service.getEmployees(index1, index2));
            return (List<Employee>) service.getEmployees(index1, index2);
        } catch (Exception e) {
            e.getMessage();
            return new ArrayList<>();
        }

    }

    @PostMapping("/deleteEmp")
    @ResponseBody
    public List<Employee> deleteEmp(@RequestParam(required = false) Integer id,
                                    @RequestParam(required = false) String rollbackDemand, @RequestParam Integer index1,
                                    @RequestParam Integer index2) {
        try {
            logger.info("inside deleteEmp method......>>>" + id + " rollbackDemand::" + rollbackDemand);
            service.deleteEmployee(Long.valueOf(id));
            return (List<Employee>) service.getEmployees(index1, index2);
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    @GetMapping("/searchEmp/{searching}")
    @ResponseBody
    public List<Employee> searchEmp(@PathVariable String searching, @RequestParam(required = false) Integer index1,
                                    @RequestParam(required = false) Integer index2) {
        try {
            logger.info("inside searchEmp method......>>>");
            logger.info("success adding into empList..."
                    + (List<Employee>) service.searchEmployee(searching, index1, index2));
            return service.searchEmployee(searching, index1, index2);
        } catch (Exception e) {
            logger.error(e);
            return new ArrayList<>();

        }

    }

    @PostMapping("/upload")
    @ResponseBody
    public String uploadfile(@RequestParam MultipartFile file) {

        try {
            if (!file.isEmpty()) {
                logger.info("inside upload method Post......file empty?>>>" + file.isEmpty());
                String path = new File(file.getOriginalFilename()).getAbsolutePath();

                return service.bulkUpload(path);

            } else {
                return "Uploaded file is empty.";
            }

        } catch (Exception e) {

            logger.error(e);
            return e.getLocalizedMessage();
        }

    }

    @GetMapping("/getSearchRecordCount/{searching}")
    @ResponseBody
    public int getSearchRecordCount(@PathVariable String searching) {
        try {
            logger.info("inside getSearchRecordCount method......>>>");

            return service.getSearchRecordCount(searching);
        } catch (Exception e) {
            e.getMessage();
        }
        return 0;
    }

    @GetMapping("/getRecordCount")
    @ResponseBody
    public int getRecordCount() {
        try {
            logger.info("inside getCount method......>>>" + service.getRecordCount());

            return service.getRecordCount();
        } catch (Exception e) {
            e.getMessage();
        }
        return 0;
    }
}
