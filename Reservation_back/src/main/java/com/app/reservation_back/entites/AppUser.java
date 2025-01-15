package com.app.reservation_back.entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    @Column(nullable = false)
    private String email;
    private String password;
    private Role role;
    private boolean enabled = false;
    @OneToMany(mappedBy = "Joueur")
    @JsonIgnore
    List<Reservation> reservations;
    public enum Role {
        ADMIN,
        JOUEUR
    }
}