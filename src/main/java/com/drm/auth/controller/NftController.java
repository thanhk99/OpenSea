package com.drm.auth.controller;

import com.drm.auth.dto.MintNftRequest;
import com.drm.auth.entity.Nft;
import com.drm.auth.repository.NftRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nfts")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class NftController {

    private final NftRepository nftRepository;

    public NftController(NftRepository nftRepository) {
        this.nftRepository = nftRepository;
    }

    @GetMapping
    public ResponseEntity<List<Nft>> getAllNfts() {
        return ResponseEntity.ok(nftRepository.findAll());
    }

    @PostMapping("/minted")
    public ResponseEntity<?> saveMintedNft(@RequestBody MintNftRequest request) {

        if (request.getTokenId() == null || request.getTokenId().isBlank()) {
            return ResponseEntity.badRequest().body("tokenId không được để trống");
        }

        if (request.getTxHash() == null || request.getTxHash().isBlank()) {
            return ResponseEntity.badRequest().body("txHash không được để trống");
        }

        if (request.getNftContractAddress() == null || request.getNftContractAddress().isBlank()) {
            return ResponseEntity.badRequest().body("nftContractAddress không được để trống");
        }

        if (request.getOwnerWallet() == null || request.getOwnerWallet().isBlank()) {
            return ResponseEntity.badRequest().body("ownerWallet không được để trống");
        }

        var existedNft = nftRepository.findByTxHash(request.getTxHash());

        if (existedNft.isPresent()) {
            return ResponseEntity.ok(existedNft.get());
        }

        Nft nft = new Nft();
        nft.setTokenId(request.getTokenId());
        nft.setTxHash(request.getTxHash());
        nft.setNftContractAddress(request.getNftContractAddress());
        nft.setOwnerWallet(request.getOwnerWallet());
        nft.setMetadataUri(request.getMetadataUri());
        nft.setName(request.getName());
        nft.setDescription(request.getDescription());
        nft.setImageUrl(request.getImageUrl());
        nft.setStatus("MINTED");

        Nft savedNft = nftRepository.save(nft);

        return ResponseEntity.ok(savedNft);
    }
}