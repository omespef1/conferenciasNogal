export class lugaresModel {
    constructor(
        public nombre:string,
        public direccion :string,
        public latitud:number,
        public longitud:number
    ){}
}
export class eerevet {
constructor(
public  rev_cont:number,
public  rev_esta:string,
public  rev_fech:string,
public  rev_desc:string,
public rev_luga:string,
public rev_fini:string,
public rev_ffin:string,
public rev_foto:string,
public rev_obse:string
)
{}
}
export class ee_agend {
  constructor(
    public rev_cont:number,
    public age_cont:number,
    public age_acti:string,
    public age_fech:string,
    public age_hori:string,
    public age_horf:string,
    public age_luga:string,
    public ter_codi:string,
    public ter_noco:string,
    public con_perf:string,
    public con_foto:string
  ){
  }
}
export class eeConfe{
  constructor(
    public rev_cont :number,
    public ter_noco:string,
    public con_perf:string,
    public con_foto:string,
    public ter_codi:string,
  ){
  }
}
export class page {
constructor(
  public name:string,
  public icon:string,
  public logOut:boolean,
  public pageOpen:any
){
}
}
export class asise{
  constructor(
    public asi_codi:string,
    public asi_nomb:string,
    public asi_apel:string,
    public asi_clav:string
  ){}
}
export class eecalco{
constructor(
  public rev_cont:number,
  public ter_codi:string,
  public asi_codi:string,
  public cal_valo:number
){
 rev_cont =0;
 ter_codi="";
 asi_codi="";
 cal_valo=0;
}

}