package pl.coderslab.charity.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.coderslab.charity.donation.DonationService;
import pl.coderslab.charity.institution.InstitutionService;


@Controller
public class HomeController {
    private final DonationService donationService;
    private final InstitutionService institutionService;

    public HomeController(DonationService donationService, InstitutionService institutionService) {
        this.donationService = donationService;
        this.institutionService = institutionService;
    }


    @RequestMapping("/")
    public String homeAction(Model model){
        model.addAttribute("allBag",donationService.bagQuantity());
        model.addAttribute("allDonation",donationService.donationQuantity());
        model.addAttribute("institution",institutionService.allInstitution());

        return "index";
    }
}
