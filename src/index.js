import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import './index.css';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
      </button>
    );
  }
  
  class Board extends React.Component {
    
    renderSquare(i) {
      const key = "square".concat(i);
      return (
        <Square key={key}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      const imageUrl = require(`./resources/pelilauta.jpg`)
      const rows = [];
      for (let j=0; j<30; j++) {
        let row = [];
        for(let i=0; i<45; i++) {
          row.push(this.renderSquare(45*j+i));
        }
        rows.push(<div className="board-row">{row}</div>)
      }
      return (
        <div style={{ backgroundImage: `url(${imageUrl})`}} className="pelilauta" >
          {rows}
        </div>
      );
    }
  }

  class ColorSelect extends React.Component {

    render() {
      return (
        <select 
          name={this.props.name}
          value={this.props.value ? this.props.value : "null"}
          onChange={(e) => this.props.onChange(e, this.props.name)} >
          <option value="null"></option>
          <option value="musta">Musta</option>
          <option value="punainen">Punainen</option>
          <option value="vihrea">Vihreä</option>
          <option value="keltainen">Keltainen</option>
          <option value="sininen">Sininen</option>
        </select>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.handleColorSelect = this.handleColorSelect.bind(this);
      this.state = {lastClicked: null,
        pisteet: {musta: 0, punainen: 0, vihrea: 0, sininen: 0, keltainen: 0},
        stokob: {name: "Stockholm-Kobenhavn", key: "stokob", railLength: 3, double: true, built1: null, built2: null},
        stopet: {name: "Stockholm-Petrograd", key: "stopet", railLength: 8, double: false, built1: null, built2: null},
        petrig: {name: "Petrograd-Riga", key: "petrig", railLength: 4, double: false, built1: null, built2: null},
        petwil: {name: "Petrograd-Wilno", key: "petwil", railLength: 4, double: false, built1: null, built2: null},
        petmos: {name: "Petrograd-Moskva", key: "petmos", railLength: 4, double: false, built1: null, built2: null},
        rigdan: {name: "Riga-Danzig", key: "rigdan", railLength: 3, double: false, built1: null, built2: null},
        rigwil: {name: "Riga-Wilno", key: "rigwil", railLength: 4, double: false, built1: null, built2: null},
        edilon: {name: "Edinburgh-London", key: "edilon", railLength: 4, double: true, built1: null, built2: null},
        kobess: {name: "Kobenhavn-Essen", key: "kobess", railLength: 3, double: true, built1: null, built2: null},
        danber: {name: "Danzig-Berlin", key: "danber", railLength: 4, double: false, built1: null, built2: null},
        danwar: {name: "Danzig-Warszawa", key: "danwar", railLength: 2, double: false, built1: null, built2: null},
        londie: {name: "London-Dieppe", key: "londie", railLength: 2, double: true, built1: null, built2: null},
        lonams: {name: "London-Amsterdam", key: "lonams", railLength: 2, double: false, built1: null, built2: null},
        amsess: {name: "Amsterdam-Essen", key: "amsess", railLength: 3, double: false, built1: null, built2: null},
        amsbru: {name: "Amsterdam-Bruxelles", key: "amsbru", railLength: 1, double: false, built1: null, built2: null},
        amsfra: {name: "Amsterdam-Frankfurt", key: "amsfra", railLength: 2, double: false, built1: null, built2: null},
        essber: {name: "Essen-Berlin", key: "essber", railLength: 2, double: false, built1: null, built2: null},
        essfra: {name: "Essen-Frankfurt", key: "essfra", railLength: 2, double: false, built1: null, built2: null},
        berfra: {name: "Berlin-Frankfurt", key: "berfra", railLength: 3, double: true, built1: null, built2: null},
        berwar: {name: "Berlin-Warszawa", key: "berwar", railLength: 4, double: true, built1: null, built2: null},
        berwie: {name: "Berlin-Wien", key: "berwie", railLength: 3, double: false, built1: null, built2: null},
        warwil: {name: "Warszawa-Wilno", key: "warwil", railLength: 3, double: false, built1: null, built2: null},
        warkyi: {name: "Warszawa-Kyiv", key: "warkyi", railLength: 4, double: false, built1: null, built2: null},
        warwie: {name: "Warszawa-Wien", key: "warwie", railLength: 4, double: false, built1: null, built2: null},
        wilsmo: {name: "Wilno-Smolensk", key: "wilsmo", railLength: 3, double: false, built1: null, built2: null},
        wilkyi: {name: "Wilno-Kyiv", key: "wilkyi", railLength: 2, double: false, built1: null, built2: null},
        smomos: {name: "Smolensk-Moskva", key: "smomos", railLength: 2, double: false, built1: null, built2: null},
        smokyi: {name: "Smolensk-Kyiv", key: "smokyi", railLength: 3, double: false, built1: null, built2: null},
        moskha: {name: "Moskva-Kharkov", key: "moskha", railLength: 4, double: false, built1: null, built2: null},
        brudie: {name: "Bruxelles-Dieppe", key: "brudie", railLength: 2, double: false, built1: null, built2: null},
        brupar: {name: "Bruxelles-Paris", key: "brupar", railLength: 2, double: true, built1: null, built2: null},
        brufra: {name: "Bruxelles-Frankfurt", key: "brufra", railLength: 2, double: false, built1: null, built2: null},
        frapar: {name: "Frankfurt-Paris", key: "frapar", railLength: 3, double: true, built1: null, built2: null},
        framun: {name: "Frankfurt-München", key: "framun", railLength: 2, double: false, built1: null, built2: null},
        kyikha: {name: "Kyiv-Kharkov", key: "kyikha", railLength: 4, double: false, built1: null, built2: null},
        kyibuc: {name: "Kyiv-Bucuresti", key: "kyibuc", railLength: 4, double: false, built1: null, built2: null},
        kyibud: {name: "Kyiv-Budapest", key: "kyibud", railLength: 6, double: false, built1: null, built2: null},
        bredie: {name: "Brest-Dieppe", key: "bredie", railLength: 2, double: false, built1: null, built2: null},
        brepar: {name: "Brest-Paris", key: "brepar", railLength: 3, double: false, built1: null, built2: null},
        brepam: {name: "Brest-Pamplona", key: "brepam", railLength: 4, double: false, built1: null, built2: null},
        diepar: {name: "Dieppe-Paris", key: "diepar", railLength: 1, double: false, built1: null, built2: null},
        parpam: {name: "Paris-Pamplona", key: "parpam", railLength: 4, double: true, built1: null, built2: null},
        parman: {name: "Paris-Marseille", key: "parman", railLength: 4, double: false, built1: null, built2: null},
        parzur: {name: "Paris-Zürich", key: "parzur", railLength: 3, double: false, built1: null, built2: null},
        munzur: {name: "München-Zürich", key: "munzur", railLength: 2, double: false, built1: null, built2: null},
        munven: {name: "München-Venezia", key: "munven", railLength: 2, double: false, built1: null, built2: null},
        munwie: {name: "München-Wien", key: "munwie", railLength: 3, double: false, built1: null, built2: null},
        wiebud: {name: "Wien-Budapest", key: "wiebud", railLength: 1, double: true, built1: null, built2: null},
        wiezag: {name: "Wien-Zagrab", key: "wiezag", railLength: 2, double: false, built1: null, built2: null},
        kharos: {name: "Kharkov-Rostov", key: "kharos", railLength: 2, double: false, built1: null, built2: null},
        zurven: {name: "Zürich-Venezia", key: "zurven", railLength: 2, double: false, built1: null, built2: null},
        zurmar: {name: "Zürich-Marseille", key: "zurmar", railLength: 2, double: false, built1: null, built2: null},
        venzag: {name: "Venezia-Zagrab", key: "venzag", railLength: 2, double: false, built1: null, built2: null},
        venrom: {name: "Venezia-Roma", key: "venrom", railLength: 2, double: false, built1: null, built2: null},
        zagbud: {name: "Zagrab-Budapest", key: "zagbud", railLength: 2, double: false, built1: null, built2: null},
        zagsar: {name: "Zagrab-Sarajevo", key: "zagsar", railLength: 3, double: false, built1: null, built2: null},
        budbuc: {name: "Budapest-Bucuresti", key: "budbuc", railLength: 4, double: false, built1: null, built2: null},
        budsar: {name: "Budapest-Sarajevo", key: "budsar", railLength: 3, double: false, built1: null, built2: null},
        bucsev: {name: "Bucuresti-Sevastopol", key: "bucsev", railLength: 4, double: false, built1: null, built2: null},
        buccon: {name: "Bucuresti-Constantinople", key: "buccon", railLength: 3, double: false, built1: null, built2: null},
        bucsof: {name: "Bucuresti-Sofia", key: "bucsof", railLength: 2, double: false, built1: null, built2: null},
        pammad: {name: "Pamplona-Madrid", key: "pammad", railLength: 3, double: true, built1: null, built2: null},
        pambar: {name: "Pamplona-Barcelona", key: "pambar", railLength: 2, double: false, built1: null, built2: null},
        pammar: {name: "Pamplona-Marseille", key: "pammar", railLength: 4, double: false, built1: null, built2: null},
        marbar: {name: "Marseille-Barcelona", key: "marbar", railLength: 4, double: false, built1: null, built2: null},
        marrom: {name: "Marseille-Roma", key: "marrom", railLength: 4, double: false, built1: null, built2: null},
        rompal: {name: "Roma-Palermo", key: "rompal", railLength: 4, double: false, built1: null, built2: null},
        rombri: {name: "Roma-Brindisi", key: "rombri", railLength: 2, double: false, built1: null, built2: null},
        sarath: {name: "Sarajevo-Athina", key: "sarath", railLength: 4, double: false, built1: null, built2: null},
        sarsof: {name: "Sarajevo-Sofia", key: "sarsof", railLength: 2, double: false, built1: null, built2: null},
        sofath: {name: "Sofia-Athina", key: "sofath", railLength: 3, double: false, built1: null, built2: null},
        sofcon: {name: "Sofia-Constantinople", key: "sofcon", railLength: 3, double: false, built1: null, built2: null},
        sevros: {name: "Sevastopol-Rostov", key: "sevros", railLength: 4, double: false, built1: null, built2: null},
        sevsoc: {name: "Sevastopol-Sochi", key: "sevsoc", railLength: 2, double: false, built1: null, built2: null},
        severz: {name: "Sevastopol-Erzurum", key: "severz", railLength: 4, double: false, built1: null, built2: null},
        sevcon: {name: "Sevastopol-Constantinople", key: "sevcon", railLength: 4, double: false, built1: null, built2: null},
        rossoc: {name: "Rostov-Sochi", key: "rossoc", railLength: 2, double: false, built1: null, built2: null},
        socerz: {name: "Sochi-Erzurum", key: "socerz", railLength: 3, double: false, built1: null, built2: null},
        lismad: {name: "Lisboa-Madrid", key: "lismad", railLength: 3, double: false, built1: null, built2: null},
        liscad: {name: "Lisboa-Cadiz", key: "liscad", railLength: 2, double: false, built1: null, built2: null},
        madbar: {name: "Madrid-Barcelona", key: "madbar", railLength: 2, double: false, built1: null, built2: null},
        madcad: {name: "Madrid-Cadiz", key: "madcad", railLength: 3, double: false, built1: null, built2: null},
        bripal: {name: "Brindisi-Palermo", key: "bripal", railLength: 3, double: false, built1: null, built2: null},
        briath: {name: "Brindisi-Athina", key: "briath", railLength: 4, double: false, built1: null, built2: null},
        palsmy: {name: "Palermo-Smyrna", key: "palsmy", railLength: 6, double: false, built1: null, built2: null},
        athsmy: {name: "Athina-Smyrna", key: "athsmy", railLength: 2, double: false, built1: null, built2: null},
        smycon: {name: "Smyrna-Constantinople", key: "smycon", railLength: 2, double: false, built1: null, built2: null},
        smyang: {name: "Smyrna-Angora", key: "smyang", railLength: 3, double: false, built1: null, built2: null},
        conang: {name: "Constantinople-Angora", key: "conang", railLength: 2, double: false, built1: null, built2: null},
        angerz: {name: "Angora-Erzurum", key: "angerz", railLength: 3, double: false, built1: null, built2: null}
      };
    }

    reitit(i) {
      if (i === 113 || i === 114 || i === 157 || i === 158 || i === 201|| i === 202) {return this.state.stokob;} 
      else if ((i >= 116 && i <= 126) || i ===  161) {return this.state.stopet;} 
      else if (i >= 166 && i<= 171) {return this.state.petrig;} 
      else if (i === 216 || i === 217 || i === 260 || i === 261 || i === 305 || i === 349) {return this.state.petwil;} 
      else if (i === 173 || i === 174 || i === 219 || i === 220 || i === 265 || i === 311 || i === 356) {return this.state.petmos;} 
      else if (i === 164 || i === 208 || i === 252 || i === 297) {return this.state.rigdan;} 
      else if (i === 210 || i === 255 || i === 300 || i === 301 || i === 346 || i === 347) {return this.state.rigwil;} 
      else if (i === 143 || i === 188 || i === 189 || i === 234 || i === 279 || i === 280 || i === 324 || i === 325 || i === 370) {return this.state.edilon;} 
      else if (i === 245 || i === 246 || i === 289 || i === 290 || i === 333 || i === 334 || i === 335 || i === 378 || i === 379) {return this.state.kobess;} 
      else if ((i >= 293 && i <= 296) || i === 337 || i === 338 || i === 382 ) {return this.state.danber;} 
      else if (i === 342 || i === 343 || i === 388) {return this.state.danwar;} 
      else if (i === 415 || i === 460 || i === 505) {return this.state.londie;} 
      else if (i === 371 || i === 372 || i === 373) {return this.state.lonams;} 
      else if (i === 374 || i === 330 || i === 331 || i === 377) {return this.state.amsess;} 
      else if (i === 419 || i === 464) {return this.state.amsbru;} 
      else if (i === 420 || i === 466) {return this.state.amsfra;} 
      else if (i === 424 || i === 425 || i === 426) {return this.state.essber;} 
      else if (i === 469 || i === 468 || i === 513) {return this.state.essfra;} 
      else if (i === 558 || i === 514 || i === 559 || i === 515 || i === 470 || i === 471 || i === 516) {return this.state.berfra;} 
      else if ((i >= 428 && i <= 433) || (i >= 473 && i <= 477)) {return this.state.berwar;} 
      else if (i === 517 || i === 562 || i === 563 || i === 608 || i === 609 || i === 654) {return this.state.berwie;} 
      else if (i === 390 || i === 391 || i === 392) {return this.state.warwil;} 
      else if (i === 479 || i === 480 || i === 525 || i === 526 || i === 527 || i === 528 || i === 529) {return this.state.warkyi;} 
      else if (i === 523 || i === 567 || i === 611 || i === 612 || i === 655) {return this.state.warwie;} 
      else if (i === 394 || i === 350 || i === 396 || i === 397) {return this.state.wilsmo;} 
      else if (i === 439 || i === 440 || i === 485 || i === 530) {return this.state.wilkyi;} 
      else if (i === 443 || i === 444 || i === 445 || i === 400) {return this.state.smomos;} 
      else if (i === 488 || i === 532 || i === 533 || i === 577 || i === 576) {return this.state.smokyi;} 
      else if (i === 446 || i === 447 || i === 492 || i === 537 || i === 582 || i === 626) {return this.state.moskha;} 
      else if (i === 506 || i === 507 || i === 551) {return this.state.brudie;} 
      else if (i === 508 || i === 552 || i === 553 || i === 597 || i === 598) {return this.state.brupar;} 
      else if (i === 509 || i === 510 || i === 511) {return this.state.brufra;} 
      else if (i === 556 || i === 601 || i === 600 || i === 645 || i === 599 || i === 644 || i === 643) {return this.state.frapar;} 
      else if (i === 648 || i === 603) {return this.state.framun;} 
      else if (i === 620 || i === 666 || i === 667 || i === 668 || i === 669) {return this.state.kyikha;} 
      else if (i === 619 || i === 663 || i === 664 || i === 708 || i === 753 || i === 797 || i === 798) {return this.state.kyibuc;} 
      else if ((i >= 570 && i <= 574) || i === 613 || i === 614 || i === 657 || i === 658 || i === 702) {return this.state.kyibud;} 
      else if (i === 547 || i === 548 || i === 549) {return this.state.bredie;} 
      else if (i === 592 || i === 593 || i === 594 || i === 639 || i === 640) {return this.state.brepar;} 
      else if (i === 637 || i === 683 || i === 729 || i === 774 || i === 819) {return this.state.brepam;} 
      else if (i === 596) {return this.state.diepar;} 
      else if (i === 686 || i === 731 || i === 775 || i === 776 || i === 820 || i === 821 || i === 865) {return this.state.parpam;} 
      else if (i === 687 || i === 732 || i === 777 || i === 778 || i === 823 || i === 824 || i === 870) {return this.state.parman;} 
      else if (i === 688 || i === 733 || i === 734 || i === 735 || i === 736 || i === 780 || i === 781) {return this.state.parzur;} 
      else if (i === 693 || i === 694 || i === 737 || i === 738) {return this.state.munzur;} 
      else if (i === 695 || i === 740 || i === 785) {return this.state.munven;} 
      else if (i === 696 || i === 697 || i === 698) {return this.state.munwie;} 
      else if (i === 700) {return this.state.wiebud;}
      else if (i === 699 || i === 744 || i === 789) {return this.state.wiezag;}
      else if (i === 671 || i === 672 || i === 717) {return this.state.kharos;}
      else if (i === 783 || i === 784 || i === 829) {return this.state.zurven;}
      else if (i === 826 || i === 827 || i === 871) {return this.state.zurmar;}
      else if (i === 786 || i === 787 || i === 788 || i === 831 || i === 833) {return this.state.venzag;}
      else if (i === 875 || i === 921 || i === 920) {return this.state.venrom;}
      else if (i === 834 || i === 835 || i === 790 || i === 745) {return this.state.zagbud;}
      else if (i === 879 || i === 924 || i === 969 || i === 970 || i === 971) {return this.state.zagsar;}
      else if (i === 747 || i === 748 || i === 749 || i === 794 || i === 795 || i === 840 || i === 841) {return this.state.budbuc;}
      else if (i === 791 || i === 792 || i === 837 || i === 882 || i === 927) {return this.state.budsar;}
      else if (i === 843 || i === 844 || i === 799 || i === 800 || i === 801 || i === 802 || i === 847) {return this.state.bucsev;}
      else if (i === 888 || i === 933 || i === 978 || i === 979 || i === 1024) {return this.state.buccon;}
      else if (i === 887 || i === 932 || i === 931 || i === 976) {return this.state.bucsof;}
      else if (i === 953 || i === 952 || i === 997 || i === 996 || i === 1041 || i === 1040) {return this.state.pammad;}
      else if (i === 954 || i === 999 || i === 1044) {return this.state.pambar;}
      else if (i === 955 || i === 956 || i === 911 || i === 866 || i === 867 || i === 868 || i === 914) {return this.state.pammar;}
      else if (i === 959 || i === 958 || i === 957 || i === 1002 || i === 1001 || i === 1046 || i === 1045) {return this.state.marbar;}
      else if (i === 917 || i === 872 || i === 873 || i === 874 || i === 919 || i === 965) {return this.state.marrom;}
      else if (i === 1011 || i === 1012 || i === 1057 || i === 1058 || i === 1103 || i === 1148 || i === 1192) {return this.state.rompal;}
      else if (i === 967 || i === 968 || i === 1013) {return this.state.rombri;}
      else if (i === 1017 || i === 1062 || i === 1107 || i === 1152 || i === 1153) {return this.state.sarath;}
      else if (i === 928 || i === 929) {return this.state.sarsof;}
      else if (i ===  1019 || i === 1063 || i === 1064 || i === 1108 || i === 1109 || i === 1154) {return this.state.sofath;}
      else if (i === 1021 || i === 1022 || i === 1067 || i === 1068) {return this.state.sofcon;}
      else if (i === 849 || i === 803 || i === 804 || i === 759 || i === 760 || i === 761 || i === 714) {return this.state.sevros;}
      else if (i === 894 || i === 895 || i === 940 || i === 941) {return this.state.sevsoc;}
      else if (i === 1028 || i === 1029 || i === 1073 || i === 1074 || i === 1119 || i === 1120) {return this.state.severz;}
      else if (i === 982 || i === 1027 || i === 1026 || i === 1025 || i === 1070) {return this.state.sevcon;}
      else if (i === 807 || i === 852 || i === 897) {return this.state.rossoc;}
      else if (i === 986 || i === 987 || i === 1031 || i === 1032 || i === 1076 || i === 1121) {return this.state.socerz;}
      else if (i === 1081 || i === 1082 || i === 1037 || i === 1038 || i === 1039) {return this.state.lismad;}
      else if (i === 1172 || i === 1218) {return this.state.liscad;}
      else if (i === 1086 || i === 1087 || i === 1088) {return this.state.madbar;}
      else if (i === 1131 || i === 1176 || i === 1177 || i === 1221 || i === 1220) {return this.state.madcad;}
      else if (i === 1060 || i === 1105 || i === 1150 || i === 1151 || i === 1196 || i === 1197 || i === 1198) {return this.state.briath;}
      else if (i === 1104 || i === 1149) {return this.state.bripal;}
      else if (i >= 1239 && i <= 1247 ) {return this.state.palsmy;}
      else if (i === 1200 || i === 1201 || i === 1202) {return this.state.athsmy;}
      else if (i === 1203 || i === 1158 || i === 1159 || i === 1114) {return this.state.smycon;}
      else if (i === 1249 || i === 1250 || i === 1251 || i === 1252 || i === 1207) {return this.state.smyang;}
      else if (i === 1115 || i === 1116 || i === 1161 || i === 1162) {return this.state.conang;}
      else if (i === 1209 || i === 1211 || i === 1254 || i === 1255 || i === 1256) {return this.state.angerz;}
      else {return null;}
    }

    pisteitaReitista(reitti) {
      let pituus = reitti.railLength;
      let pisteet = 0;
      if (pituus === 1) {
        pisteet = 1;
      } else if (pituus === 2) {
        pisteet = 2;
      } else if (pituus === 3) {
        pisteet = 4;
      } else if (pituus === 4) {
        pisteet = 7;
      } else if (pituus === 6) {
        pisteet = 15;
      } else if (pituus === 8) {
        pisteet = 21;
      }
      return pisteet;
    }
  
    handleClick(i) {
      this.setState({lastClicked: this.reitit(i)});
      this.setState({lastIndex: i});
    }
    
    handleColorSelect(e, selectKey) {
      let oldColor = this.state.lastClicked[selectKey];
      if (oldColor) {
        let points = this.state.pisteet[oldColor];
        points = points - this.pisteitaReitista(this.state.lastClicked);
        const updatedPisteet = _.set(this.state.pisteet, oldColor, points);
        this.setState({"pisteet": updatedPisteet});  
      }

      let points = this.state.pisteet[e.target.value];
      points = points + this.pisteitaReitista(this.state.lastClicked);
      const updatedPisteet = _.set(this.state.pisteet, e.target.value, points);
      this.setState({"pisteet": updatedPisteet});

      const updatedRailway = _.set(this.state.lastClicked, selectKey, e.target.value);
      let key = updatedRailway.key;
      this.setState({key: updatedRailway});
    }
  
    render() {

      return (
        <div className="game">
          <div className="game-info">
            <div>PISTETILANNE:</div>
            <div>Musta: {this.state.pisteet.musta}</div>
            <div>Punainen: {this.state.pisteet.punainen}</div>
            <div>Vihreä: {this.state.pisteet.vihrea}</div>
            <div>Sininen: {this.state.pisteet.sininen}</div>
            <div>Keltainen: {this.state.pisteet.keltainen}</div>
          </div>
          <div className="game-board">
            <div className="above-board">
              Klikkaa rataosuutta kartalla!
            </div>
            <Board
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="move-info"> 
            {this.state.lastClicked && <div>
                  <div>{this.state.lastClicked.name}</div>
                  <div>Pituus: {this.state.lastClicked.railLength}</div>
                  <div>Pisteet: {this.pisteitaReitista(this.state.lastClicked)}</div>
                  <div>Rakentanut:               
                    <ColorSelect 
                      name="built1"
                      value={this.state.lastClicked.built1}
                      onChange={this.handleColorSelect}
                    />
                  </div>
                  {this.state.lastClicked.double && 
                  <div>Rakentanut: 
                    <ColorSelect 
                      name="built2"
                      value={this.state.lastClicked.built2}
                      onChange={this.handleColorSelect}
                    />
                  </div>}
              </div>}
          </div>
        </div>
      );
    }
  }
  
  
  ReactDOM.render(<Game />, document.getElementById("root"));
