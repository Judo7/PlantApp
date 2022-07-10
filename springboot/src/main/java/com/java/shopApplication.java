package com.java;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;



@ServletComponentScan({"com.java.config"})
@MapperScan(basePackages = {"com.java.dao"})
@EnableTransactionManagement
@SpringBootApplication
public class shopApplication {
    public static void main(String[] args) throws Exception {
        SpringApplication application = new SpringApplication(shopApplication.class);
        application.run(args);
    }
}
