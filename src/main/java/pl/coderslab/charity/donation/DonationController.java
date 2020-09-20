package pl.coderslab.charity.donation;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import pl.coderslab.charity.category.CategoryService;
import pl.coderslab.charity.institution.InstitutionService;

@Controller
public class DonationController {
    private final CategoryService categoryService;
    private final InstitutionService institutionService;
    private final DonationService donationService;

    public DonationController(CategoryService categoryService, InstitutionService institutionService, DonationService donationService) {
        this.categoryService = categoryService;
        this.institutionService = institutionService;
        this.donationService = donationService;
    }

    @GetMapping("addDonation")
    public String addDonation(Model model){
        model.addAttribute("categories",categoryService.allCategories());
        model.addAttribute("donation",new Donation());
        model.addAttribute("institution",institutionService.allInstitution());
        return "form";
    }

    @PostMapping("addDonation")
    public String addDonation(@ModelAttribute Donation donation){
        donationService.saveDonation(donation);
        return "form-confirmation";
    }
}
