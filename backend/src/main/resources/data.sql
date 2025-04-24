-- Place seed data (already added previously)
INSERT INTO place (name, category, image_url) VALUES
                                                  ('Old Market Square', 'Monument', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Old_marketplace_and_city_hall_in_Pozna%C5%84.jpg/500px-Old_marketplace_and_city_hall_in_Pozna%C5%84.jpg'),
                                                  ('Poznań Cathedral', 'Monument', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Catedral_de_Poznan%2C_Poznan%2C_Polonia%2C_2014-09-18%2C_DD_10.jpg/500px-Catedral_de_Poznan%2C_Poznan%2C_Polonia%2C_2014-09-18%2C_DD_10.jpg'),
                                                  ('Imperial Castle', 'Monument', 'https://s.inyourpocket.com/gallery/321112.jpg'),
                                                  ('Croissant Museum', 'Museum', 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Apteka_Pod_Bia%C5%82ym_Or%C5%82em_Pozna%C5%84_01.jpg'),
                                                  ('Brama Poznania', 'Museum', 'https://bramapoznania.pl/images/thb2/dsc-7926_2.jpg'),
                                                  ('Malta Lake', 'Park', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Malta_Trybuny_Pozna%C5%84_RB1.JPG/1200px-Malta_Trybuny_Pozna%C5%84_RB1.JPG'),
                                                  ('New Zoo', 'Zoo', 'https://s.inyourpocket.com/gallery/156848.jpg'),
                                                  ('Palm House', 'Park', 'https://s.inyourpocket.com/gallery/291210.jpg'),
                                                  ('Citadel Park', 'Park', 'https://s.inyourpocket.com/gallery/poznan/2021/06/poznan-citadel-park-%20Radoslaw%20Maciejewski.jpg'),
                                                  ('Stary Browar', 'Shopping Center', 'https://i2.wp.com/wielkopolska.travel/wp-content/uploads/2019/04/Stary-Browar-Jakub-Wittchen.jpg?fit=1920%2C1080&ssl=1');

-- PlaceDetails seed data
INSERT INTO place_details (description, accessibility_info, location_details, place_id, latitude, longitude) VALUES
                                                                                            ('A beautiful historic square with colorful buildings and city hall.', 'WHEELCHAIR_ACCESSIBLE', 'Poznań Old Town, near Wroniecka Street', 1, 52.408362241091524, 16.933536319308796),
                                                                                            ('One of the oldest churches in Poland with Romanesque elements.', 'PARTIALLY_ACCESSIBLE', 'Ostrów Tumski, Poznań', 2, 52.411847205951325, 16.948722320235813),
                                                                                            ('Impressive architecture from the German Empire era.', 'WHEELCHAIR_ACCESSIBLE', 'Święty Marcin 80/82, Poznań', 3, 52.407930447162400, 16.919139206775096),
                                                                                            ('Fun and educational experience of Poznań’s St. Martin croissant tradition.', 'PARTIALLY_ACCESSIBLE', 'Klasztorna 23, Poznań', 4, 52.408632659740430, 16.935014077974790),
                                                                                            ('Modern museum built over the Warta river, great multimedia exhibits.', 'WHEELCHAIR_ACCESSIBLE', 'Gdańska 2, Poznań', 5, 52.412468702619805, 16.951408603112835),
                                                                                            ('Large artificial lake with walking and biking trails.', 'WHEELCHAIR_ACCESSIBLE', 'Around Baraniaka Street, Poznań', 6, 52.402775958573564, 16.968976923089130),
                                                                                            ('One of Poland’s largest zoos, great for families.', 'PARTIALLY_ACCESSIBLE', 'Krańcowa 81, Poznań', 7, 52.400900458425966, 16.994453793674914),
                                                                                            ('Tropical plants, aquariums and greenhouses.', 'WHEELCHAIR_ACCESSIBLE', 'Matejki 18, Poznań', 8, 52.402105902345600, 16.901825442996017),
                                                                                            ('Historical park with sculptures and war memorials.', 'WHEELCHAIR_ACCESSIBLE', 'al. Armii Poznań, Poznań', 9, 52.421854130244040, 16.93612426261012),
                                                                                            ('Modern shopping and arts center built in a former brewery.', 'WHEELCHAIR_ACCESSIBLE', 'Półwiejska 42, Poznań', 10, 52.401461270578180, 16.928053712820162);
