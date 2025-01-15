package com.app.reservation_back.Service;

import com.app.reservation_back.entites.AppUser;

import java.util.List;

public interface IServiceUser {
    AppUser createAppUser (AppUser appUser);
    AppUser LoadUserByUserName(String username);
    public AppUser updateAppUser(AppUser joueur);


    void deleteAppUserById(int id);

    AppUser getAppUserById(int id);

    List<AppUser> getAllAppUsers();
}
