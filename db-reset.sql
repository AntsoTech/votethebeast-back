DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS countries;
DROP TABLE IF EXISTS positions;
CREATE TABLE countries (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  flag TEXT
);
INSERT INTO countries (name, flag)
VALUES (
    "France",
    "https://www.ima.edu.my/upload_file/5030570004fr.gif"
  ),
  (
    "Brazil",
    "https://icons.iconarchive.com/icons/wikipedia/flags/256/BR-Brazil-Flag-icon.png"
  ),
  (
    "Germany",
    "https://icons.iconarchive.com/icons/wikipedia/flags/256/DE-Germany-Flag-icon.png"
  ),
  (
    "Czech Republik",
    "https://www.icône.com/images/icones/3/6/flag-cz.png"
  );
CREATE TABLE positions (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL
);
INSERT INTO positions (name)
VALUES ("Striker"),
  ("Middlefield"),
  ("Defender"),
  ("Goalkeeper");
CREATE TABLE players (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  firstname VARCHAR(80) NOT NULL,
  lastname VARCHAR(80),
  birthdate DATE,
  picture TEXT NOT NULL,
  winnerpicture TEXT,
  points INT DEFAULT 0,
  idPosition INT NOT NULL,
  idCountry INT NOT NULL,
  CONSTRAINT fk_players_positions FOREIGN KEY (idPosition) REFERENCES positions(id),
  CONSTRAINT fk_players_countries FOREIGN KEY (idCountry) REFERENCES countries(id)
);
INSERT INTO players (
    firstname,
    lastname,
    birthdate,
    picture,
    winnerpicture,
    idPosition,
    idCountry
  )
VALUES (
    "Kilian",
    "Mbappé",
    "1998/12/20",
    "https://img.lemde.fr/2021/09/29/0/0/0/0/1328/0/45/0/f557b60_5732709-01-06.jpg",
    "https://resize-public.ladmedia.fr/r/628,,forcex/img/var/public/storage/images/toutes-les-photos/psg-lorient-encore-un-but-et-une-nouvelle-coupe-de-cheveux-pour-kylian-mbappe-1662221/kylian-mbappe-etait-sur-la-pelouse-du-parc-des-princes-ce-mercredi-17-decembre-1662225/44045955-1-fre-FR/Kylian-Mbappe-etait-sur-la-pelouse-du-Parc-des-princes-ce-mercredi-17-decembre.jpg",
    1,
    1
  ),
  (
    "Zinédine",
    "Zidane",
    "1987/06/23",
    "https://pbs.twimg.com/media/E4lBFg2XwAYFQNC.jpg",
    "https://i.pinimg.com/736x/38/bb/45/38bb454dac9293bd9502d16f9d80845b.jpg",
    2,
    1
  ),
  (
    "Michel",
    "Platini",
    "1967/06/23",
    "https://i.pinimg.com/474x/ff/e3/65/ffe3651275de00d699d18d704da350a4.jpg",
    "https://article-imgs.scribdassets.com/83v9g0ssn48qaval/images/file8PU9QDEL.jpg",
    2,
    1
  ),
  (
    "Lothar",
    "Matthaüs",
    "1980/06/23",
    "https://i.pinimg.com/originals/2c/66/fc/2c66fcce83d256440f12b6a85d99710d.jpg",
    "https://xevathethao.vn/app/uploads/2019/02/lothar-matthaus-tieu-hoang-de-khien-maradona-ne-so-123329.jpg",
    2,
    3
  ),
  (
    "Pelé",
    "",
    "1957/06/23",
    "https://s.hs-data.com/bilder/spieler/gross/1749.jpg",
    "https://pbs.twimg.com/media/ElATmm0WkAEQIHc.jpg",
    1,
    2
  ),
  (
    "Ronalidnho",
    "",
    "1982/06/23",
    "https://pbs.twimg.com/media/FOU_YXOXEAYcUEI.jpg",
    "https://pbs.twimg.com/media/FOXHkGuWUAMDrV1.jpg",
    2,
    2
  ),
  (
    "Pavel",
    "Nedved",
    "1977/06/23",
    "https://fr-academic.com/pictures/frwiki/80/Pavel_Nedv%C4%9Bd.jpg",
    "https://images2.minutemediacdn.com/image/upload/c_fill,w_1200,h_630,f_auto,q_auto,g_auto/shape/cover/sport/57fcae761c783cd894000006.jpg",
    2,
    4
  ),
  (
    "Thiago",
    "Silva",
    "1988/06/23",
    "https://11contro11.it/wp-content/uploads/2022/02/thiago-silva.jpg",
    "https://spysports.net/wp-content/uploads/2022/02/thiago-silva-carabao-cup-final-chelsea-e1646064500655-750x452.jpeg",
    3,
    4
  ),
  (
    "Thibaut",
    "Courtois",
    "1991/09/23",
    "https://cdn.livesoccertv.com/tt/images/articles/88717-tibo-title.jpg?q=75&w=634",
    "https://i2-prod.mirror.co.uk/incoming/article27101608.ece/ALTERNATES/s615b/0_Liverpool-FC-v-Real-Madrid-UEFA-Champions-League-2021-2022-Final-Football-Stade-de-France-Stadiu.jpg",
    3,
    4
  );