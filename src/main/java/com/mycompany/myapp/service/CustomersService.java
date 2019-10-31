package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Customers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Customers}.
 */
public interface CustomersService {

    /**
     * Save a customers.
     *
     * @param customers the entity to save.
     * @return the persisted entity.
     */
    Customers save(Customers customers);

    /**
     * Get all the customers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Customers> findAll(Pageable pageable);


    /**
     * Get the "id" customers.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Customers> findOne(String id);

    /**
     * Delete the "id" customers.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
