package com.app.reservation_back.Repository;

import com.app.reservation_back.entites.Terrain;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TerrainRepository extends JpaRepository<Terrain,Integer> {
}
