package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.CustomersService;
import com.mycompany.myapp.domain.Customers;
import com.mycompany.myapp.repository.CustomersRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Customers}.
 */
@Service
public class CustomersServiceImpl implements CustomersService {

    private final Logger log = LoggerFactory.getLogger(CustomersServiceImpl.class);

    private final CustomersRepository customersRepository;

    public CustomersServiceImpl(CustomersRepository customersRepository) {
        this.customersRepository = customersRepository;
    }

    /**
     * Save a customers.
     *
     * @param customers the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Customers save(Customers customers) {
        log.debug("Request to save Customers : {}", customers);
        return customersRepository.save(customers);
    }

    /**
     * Get all the customers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    public Page<Customers> findAll(Pageable pageable) {
        log.debug("Request to get all Customers");
        return customersRepository.findAll(pageable);
    }


    /**
     * Get one customers by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<Customers> findOne(String id) {
        log.debug("Request to get Customers : {}", id);
        return customersRepository.findById(id);
    }

    /**
     * Delete the customers by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Customers : {}", id);
        customersRepository.deleteById(id);
    }
}
