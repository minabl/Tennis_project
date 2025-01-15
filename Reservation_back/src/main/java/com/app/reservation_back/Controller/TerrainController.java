package com.app.reservation_back.Controller;

import com.app.reservation_back.Service.ServiceTerrain;
import com.app.reservation_back.entites.Terrain;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/terrain/")
@RequiredArgsConstructor
public class TerrainController {
    private final ServiceTerrain serviceTerrain;

    @PostMapping("add")
    ResponseEntity<Terrain> addTerrain(@RequestBody Terrain terrain) {
        try{
            serviceTerrain.createTerrain(terrain);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e ){}
        return  new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @GetMapping("all")
    public List<Terrain> getTerrains() {
        return serviceTerrain.findAllTerrains();
    }

}
