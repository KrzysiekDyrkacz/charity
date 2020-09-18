package pl.coderslab.charity.donation;

import org.springframework.stereotype.Service;

@Service
public class DonationService {
    private final DonationRepository donationRepository;

    public DonationService(DonationRepository donationRepository) {
        this.donationRepository = donationRepository;
    }
    public Integer bagQuantity(){ return donationRepository.findAllBagsQuantity();}
    public Long donationQuantity(){return  donationRepository.count();}
}
