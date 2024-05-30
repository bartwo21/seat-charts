export type Ozellik = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export type CompanyLogo = {
  id: number;
  type_id: number;
  name: string;
  company_code: string;
  iso: string;
  logo: string;
  status: boolean;
  refreshed_at: string;
};

export type SelectedSeat = {
  busId: string;
  seatNumber: string;
  gender: string;
  price: string;
};

export interface BusTicket {
  ID: string;
  Vakit: string;
  FirmaNo: string;
  FirmaAdi: string;
  YerelSaat: string;
  YerelInternetSaat: string;
  Tarih: string;
  GunBitimi: string;
  Saat: string;
  HatNo: string;
  IlkKalkisYeri: string;
  SonVarisYeri: string;
  KalkisYeri: string;
  VarisYeri: string;
  IlkKalkisNoktaID: string;
  IlkKalkisNokta: string;
  KalkisNoktaID: string;
  KalkisNokta: string;
  VarisNoktaID: string;
  VarisNokta: string;
  SonVarisNoktaID: string;
  SonVarisNokta: string;
  OtobusTipi: string;
  OtobusKoltukYerlesimTipi: string;
  OTipAciklamasi: any[];
  OtobusTelefonu: string;
  OtobusPlaka: any[];
  SeyahatSuresi: string;
  SeyahatSuresiGosterimTipi: string;
  YaklasikSeyahatSuresi: string;
  BiletFiyati1: string;
  BiletFiyatiInternet: string;
  Sinif_Farki: string;
  MaxRzvZamani: string;
  SeferTipi: any[];
  SeferTipiAciklamasi: string;
  HatSeferNo: any[];
  O_Tip_Sinif: string;
  SeferTakipNo: string;
  ToplamSatisAdedi: string;
  DolulukKuraliVar: string;
  OTipOzellik: string;
  Ozellikler: Ozellik[];
  NormalBiletFiyati: string;
  DoluSeferMi: string;
  Tesisler: any[];
  SeferBosKoltukSayisi: string;
  KalkisTerminalAdi: any[];
  KalkisTerminalAdiSaatleri: any[];
  MaximumRezerveTarihiSaati: string;
  Guzergah: string;
  KKZorunluMu: string;
  BiletIptalAktifMi: string;
  AcikParaKullanimAktifMi: string;
  SefereKadarIptalEdilebilmeSuresiDakika: string;
  FirmaSeferAciklamasi: any[];
  SatisYonlendirilecekMi: string;
  companyLogo: CompanyLogo;
  selectedSeats: SelectedSeat[];
}
