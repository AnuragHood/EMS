package com.example.boot.EmployeeManagementSystem.service;

import com.example.boot.EmployeeManagementSystem.bean.User;
import com.example.boot.EmployeeManagementSystem.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepo userRepo;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(userName);
        if (user == null) throw new UsernameNotFoundException(userName);
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        user.getRoles().forEach(r -> grantedAuthorities.add(new SimpleGrantedAuthority(r.getName())));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                grantedAuthorities);
    }
}
