package com.example.boot.EmployeeManagementSystem.bean;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Transient;
import javax.persistence.SequenceGenerator;
import javax.persistence.GenerationType;

@Entity
@EnableAutoConfiguration
@SequenceGenerator(name = "seq", initialValue = 357948, allocationSize = 100)
public class Employee {
    @Id
    @JsonInclude
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
    public Long id;
    private String firstName;
    private String lastName;
    private String inputEmail;
    private String inputPassword;
    private String inputAddress;
    private String inputAddress2;
    private String inputCity;
    private String inputState;
    private int inputZip;
    @Transient
    private String updateFlag;

    public String getUpdateFlag() {
        return updateFlag;
    }

    public void setUpdateFlag(String updateFlag) {
        this.updateFlag = updateFlag;
    }

    @Override
    public String toString() {
        return "Employee [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", inputEmail="
                + inputEmail + ", inputPassword=" + inputPassword + ", inputAddress=" + inputAddress
                + ", inputAddress2=" + inputAddress2 + ", inputCity=" + inputCity + ", inputState=" + inputState
                + ", inputZip=" + inputZip + ", updateFlag=" + updateFlag + ", getUpdateFlag()=" + getUpdateFlag()
                + ", getId()=" + getId() + ", getFirstName()=" + getFirstName() + ", getLastName()=" + getLastName()
                + ", getInputEmail()=" + getInputEmail() + ", getInputPassword()=" + getInputPassword()
                + ", getInputAddress()=" + getInputAddress() + ", getInputAddress2()=" + getInputAddress2()
                + ", getInputCity()=" + getInputCity() + ", getInputState()=" + getInputState() + ", getInputZip()="
                + getInputZip() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()="
                + super.toString() + "]";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getInputEmail() {
        return inputEmail;
    }

    public void setInputEmail(String inputEmail) {
        this.inputEmail = inputEmail;
    }

    public String getInputPassword() {
        return inputPassword;
    }

    public void setInputPassword(String inputPassword) {
        this.inputPassword = inputPassword;
    }

    public String getInputAddress() {
        return inputAddress;
    }

    public void setInputAddress(String inputAddress) {
        this.inputAddress = inputAddress;
    }

    public String getInputAddress2() {
        return inputAddress2;
    }

    public void setInputAddress2(String inputAddress2) {
        this.inputAddress2 = inputAddress2;
    }

    public String getInputCity() {
        return inputCity;
    }

    public void setInputCity(String inputCity) {
        this.inputCity = inputCity;
    }

    public String getInputState() {
        return inputState;
    }

    public void setInputState(String inputState) {
        this.inputState = inputState;
    }

    public int getInputZip() {
        return inputZip;
    }

    public void setInputZip(int inputZip) {
        this.inputZip = inputZip;
    }

}
