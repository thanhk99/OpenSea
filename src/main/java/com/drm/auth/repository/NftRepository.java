package com.drm.auth.repository;

import com.drm.auth.entity.Nft;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NftRepository extends JpaRepository<Nft, Long> {

    Optional<Nft> findByTxHash(String txHash);
}