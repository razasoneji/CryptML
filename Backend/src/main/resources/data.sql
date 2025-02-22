INSERT INTO algorithm (name, type, pros, cons) VALUES
                                                   ('AES', 'Symmetric Key Algorithm',
                                                    'Highly secure, widely used in government and commercial applications, supports multiple key lengths (128, 192, 256-bit).',
                                                    'Can be slow in software implementations without hardware acceleration.'),

                                                   ('ChaCha20', 'Symmetric Key Algorithm',
                                                    'Faster than AES on software-only implementations, strong security guarantees, resistant to timing attacks.',
                                                    'Less widespread hardware support compared to AES.'),

                                                   ('DES', 'Symmetric Key Algorithm',
                                                    'Simple and widely studied, legacy compatibility.',
                                                    'Weak security (56-bit key length is vulnerable to brute force attacks).'),

                                                   ('Blowfish', 'Symmetric Key Algorithm',
                                                    'Fast encryption, flexible key length (32-448 bits), good for software implementations.',
                                                    'Vulnerable to some attacks (e.g., weak keys), not ideal for modern security needs.'),

                                                   ('RC4', 'Symmetric Key Algorithm',
                                                    'Fast and simple stream cipher, used in older protocols like WEP and SSL.',
                                                    'Vulnerable to multiple cryptographic attacks, considered insecure today.'),

                                                   ('RSA', 'Asymmetric Key Algorithm',
                                                    'Strong security for encryption and digital signatures, widely used in SSL/TLS.',
                                                    'Slow performance for large data encryption, key sizes must be large (2048-bit+) for strong security.'),

                                                   ('ECC', 'Asymmetric Key Algorithm',
                                                    'Stronger security with smaller key sizes compared to RSA, efficient for mobile and IoT devices.',
                                                    'More complex to implement, patents have historically limited adoption.'),

                                                   ('MD5', 'Hash Function',
                                                    'Fast and widely available, used in legacy systems.',
                                                    'Highly vulnerable to collisions, unsuitable for cryptographic use.'),

                                                   ('SHA-256', 'Hash Function',
                                                    'Strong cryptographic security, widely used in blockchain and security applications.',
                                                    'Computationally more expensive than MD5.'),

                                                   ('SHA-3', 'Hash Function',
                                                    'More flexible and secure than SHA-2, designed for post-quantum security.',
                                                    'Less widely adopted than SHA-256, slightly slower in some implementations.');
