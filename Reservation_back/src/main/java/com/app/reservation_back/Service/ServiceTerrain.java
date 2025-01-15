package com.app.reservation_back.Service;

import com.app.reservation_back.Repository.TerrainRepository;
import com.app.reservation_back.entites.Terrain;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ServiceTerrain implements IServiceTerrain{
private final TerrainRepository terrainRepository;
    @Override
    public Terrain createTerrain(Terrain terr) {
        return terrainRepository.save(terr);
    }

    @Override
    public Terrain findTerrainById(int id) {
        return terrainRepository.findById(id).get();
    }

    @Override
    public List<Terrain> findAllTerrains() {
        return terrainRepository.findAll();
    }
}
