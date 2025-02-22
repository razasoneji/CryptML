package com.project.backend.Repositories;

import com.project.backend.Entities.CryptographicData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CryptographicDataRepository extends JpaRepository<CryptographicData, Long> {
}
