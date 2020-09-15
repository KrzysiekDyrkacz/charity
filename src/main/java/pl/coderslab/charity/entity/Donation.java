package pl.coderslab.charity.entity;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer quantity;
    @ManyToMany
    private List<Category> categoryList;
    @ManyToOne
    private Institution institution;
    private String street;
    private String city;
    private String zipCode;
    private LocalDate pickUpDate;
    private LocalTime pickUpTime;
    private String pickUpComment;

    public Long getId() {
        return id;
    }

    public Donation setId(Long id) {
        this.id = id;
        return this;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Donation setQuantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public List<Category> getCategoryList() {
        return categoryList;
    }

    public Donation setCategoryList(List<Category> categoryList) {
        this.categoryList = categoryList;
        return this;
    }

    public Institution getInstitution() {
        return institution;
    }

    public Donation setInstitution(Institution institution) {
        this.institution = institution;
        return this;
    }

    public String getStreet() {
        return street;
    }

    public Donation setStreet(String street) {
        this.street = street;
        return this;
    }

    public String getCity() {
        return city;
    }

    public Donation setCity(String city) {
        this.city = city;
        return this;
    }

    public String getZipCode() {
        return zipCode;
    }

    public Donation setZipCode(String zipCode) {
        this.zipCode = zipCode;
        return this;
    }

    public LocalDate getPickUpDate() {
        return pickUpDate;
    }

    public Donation setPickUpDate(LocalDate pickUpDate) {
        this.pickUpDate = pickUpDate;
        return this;
    }

    public LocalTime getPickUpTime() {
        return pickUpTime;
    }

    public Donation setPickUpTime(LocalTime pickUpTime) {
        this.pickUpTime = pickUpTime;
        return this;
    }

    public String getPickUpComment() {
        return pickUpComment;
    }

    public Donation setPickUpComment(String pickUpComment) {
        this.pickUpComment = pickUpComment;
        return this;
    }
}
