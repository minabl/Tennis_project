package com.app.reservation_back.Service;

import com.app.reservation_back.entites.Terrain;

import java.util.List;

public interface IServiceTerrain {
    public Terrain createTerrain(Terrain terr);
    public Terrain findTerrainById(int id);
    public List<Terrain> findAllTerrains();
}
