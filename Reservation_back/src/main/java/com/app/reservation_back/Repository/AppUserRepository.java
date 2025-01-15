package com.app.reservation_back.Repository;

import com.app.reservation_back.entites.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser,Integer> {
    AppUser findByUsername(String username);

}
