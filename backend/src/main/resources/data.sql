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
INSERT INTO place_details (description, accessibility_info, location_details, place_id) VALUES
                                                                                            ('A beautiful historic square with colorful buildings and city hall.', 'WHEELCHAIR_ACCESSIBLE', 'Poznań Old Town, near Wroniecka Street', 1),
                                                                                            ('One of the oldest churches in Poland with Romanesque elements.', 'PARTIALLY_ACCESSIBLE', 'Ostrów Tumski, Poznań', 2),
                                                                                            ('Impressive architecture from the German Empire era.', 'WHEELCHAIR_ACCESSIBLE', 'Święty Marcin 80/82, Poznań', 3),
                                                                                            ('Fun and educational experience of Poznań’s St. Martin croissant tradition.', 'PARTIALLY_ACCESSIBLE', 'Klasztorna 23, Poznań', 4),
                                                                                            ('Modern museum built over the Warta river, great multimedia exhibits.', 'WHEELCHAIR_ACCESSIBLE', 'Gdańska 2, Poznań', 5),
                                                                                            ('Large artificial lake with walking and biking trails.', 'WHEELCHAIR_ACCESSIBLE', 'Around Baraniaka Street, Poznań', 6),
                                                                                            ('One of Poland’s largest zoos, great for families.', 'PARTIALLY_ACCESSIBLE', 'Krańcowa 81, Poznań', 7),
                                                                                            ('Tropical plants, aquariums and greenhouses.', 'WHEELCHAIR_ACCESSIBLE', 'Matejki 18, Poznań', 8),
                                                                                            ('Historical park with sculptures and war memorials.', 'WHEELCHAIR_ACCESSIBLE', 'al. Armii Poznań, Poznań', 9),
                                                                                            ('Modern shopping and arts center built in a former brewery.', 'WHEELCHAIR_ACCESSIBLE', 'Półwiejska 42, Poznań', 10);
