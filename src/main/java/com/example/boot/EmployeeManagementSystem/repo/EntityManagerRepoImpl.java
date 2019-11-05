package com.example.boot.EmployeeManagementSystem.repo;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;

public class EntityManagerRepoImpl implements EntityManagerRepo {
    private static Logger logger = LogManager.getLogger(EntityManagerRepoImpl.class);
    @Autowired
    private EntityManagerFactory emf;

    @Override
    @Transactional
    public String bulkUpload(String path) {
        EntityManager em = emf.createEntityManager();
        try {
            String filePath = path;
            em.getTransaction().begin();
            Query query = em.createNativeQuery(
                    "LOAD DATA LOCAL INFILE ? INTO TABLE employee COLUMNS TERMINATED BY ',' ENCLOSED BY '\\\"'\n"
                            + "LINES TERMINATED BY '\\n';")
                    .setParameter(1, filePath);
            int result = query.executeUpdate();
            logger.info("result of execution:" + result);
            if (result > 0) {
                em.getTransaction().commit();
                return "Bulk upload is done successfully!!";

            } else {
                return "Some thing went wrong 'SQLEXEPTION' occured please check if unique id constraint is violated?" +
						". ";
            }

        } catch (Exception e) {
            logger.info("error occured in upload:-->>" + e);
            e.printStackTrace();
            em.getTransaction().rollback();
            return e.getMessage();
        }

    }

}