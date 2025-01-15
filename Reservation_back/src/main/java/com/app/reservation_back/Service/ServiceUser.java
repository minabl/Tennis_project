package com.app.reservation_back.Service;

import com.app.reservation_back.Repository.AppUserRepository;
import com.app.reservation_back.entites.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceUser implements IServiceUser {

    private  final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public AppUser createAppUser(AppUser appUser) {
        if (appUser.getRole() == null) {
            appUser.setRole(AppUser.Role.JOUEUR);
        }
        String encodedPassword = passwordEncoder.encode(appUser.getPassword());
        appUser.setPassword(encodedPassword);
        appUser.setEnabled(false);

        return appUserRepository.save(appUser);
    }

    @Override
    public AppUser LoadUserByUserName(String username) {

            return appUserRepository.findByUsername(username);

    }

    @Override
    public AppUser updateAppUser(AppUser joueur) {
       // AppUser existUser = appUserRepository.findById(joueur.getId());
        return appUserRepository.save(joueur);
    }

    @Override
    public void deleteAppUserById(int id) {
        appUserRepository.deleteById(id);

    }

    @Override
    public AppUser getAppUserById(int id) {
        return appUserRepository.findById(id).get();
    }

    @Override
    public List<AppUser> getAllAppUsers() {
        return appUserRepository.findAll();
    }
}
