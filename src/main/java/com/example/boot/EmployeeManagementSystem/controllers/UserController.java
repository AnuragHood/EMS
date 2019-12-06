package com.example.boot.EmployeeManagementSystem.controllers;

import com.example.boot.EmployeeManagementSystem.UserValidator;
import com.example.boot.EmployeeManagementSystem.bean.User;
import com.example.boot.EmployeeManagementSystem.service.SecurityService;
import com.example.boot.EmployeeManagementSystem.service.SecurityServiceImpl;
import com.example.boot.EmployeeManagementSystem.service.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserValidator userValidator;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/registration")
    public String registration(Model model) {
        model.addAttribute("userForm", new User());

        return "registration";
    }

    @PostMapping("/registration")
    public String registration(@ModelAttribute("userForm") User userForm, BindingResult bindingResult,
                               RedirectAttributes redirAttrs) {
        userValidator.validate(userForm, bindingResult);

        if (bindingResult.hasErrors()) {
            return "registration";
        }

        userService.save(userForm);

        securityService.autoLogin(userForm.getUsername(), userForm.getPasswordConfirm());
        redirAttrs.addFlashAttribute("message", "Registered successfully!!");

        return "redirect:/login";
    }

    @GetMapping("/login")
    public String login(Model model, String error, String logout) {
        if (error != null)
            model.addAttribute("error", "Your username and password is invalid.");

        if (logout != null)
            model.addAttribute("message", "You have been logged out successfully.");

        return "login";
    }

    @GetMapping("/")
    public ModelAndView addEmployee() {
        logger.info("inside user controller show method GET......>>>");
        return new ModelAndView("home");
    }
}
