package com.drm.auth.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "nfts")
public class Nft {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "token_id", nullable = false)
    private String tokenId;

    @Column(name = "tx_hash", nullable = false, unique = true, length = 120)
    private String txHash;

    @Column(name = "nft_contract_address", nullable = false, length = 120)
    private String nftContractAddress;

    @Column(name = "owner_wallet", nullable = false, length = 120)
    private String ownerWallet;

    @Column(name = "metadata_uri", length = 1000)
    private String metadataUri;

    private String name;

    @Column(length = 1000)
    private String description;

    @Column(name = "image_url", length = 1000)
    private String imageUrl;

    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (status == null || status.isBlank()) {
            status = "MINTED";
        }
    }

    public Long getId() {
        return id;
    }

    public String getTokenId() {
        return tokenId;
    }

    public void setTokenId(String tokenId) {
        this.tokenId = tokenId;
    }

    public String getTxHash() {
        return txHash;
    }

    public void setTxHash(String txHash) {
        this.txHash = txHash;
    }

    public String getNftContractAddress() {
        return nftContractAddress;
    }

    public void setNftContractAddress(String nftContractAddress) {
        this.nftContractAddress = nftContractAddress;
    }

    public String getOwnerWallet() {
        return ownerWallet;
    }

    public void setOwnerWallet(String ownerWallet) {
        this.ownerWallet = ownerWallet;
    }

    public String getMetadataUri() {
        return metadataUri;
    }

    public void setMetadataUri(String metadataUri) {
        this.metadataUri = metadataUri;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}