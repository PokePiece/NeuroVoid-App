import pygame, numpy as np

pygame.init()
pygame.mixer.init()
screen = pygame.display.set_mode((800, 400))
pygame.mixer.music.load("your_lofi_song.mp3")
pygame.mixer.music.play()

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    arr = np.random.randint(0, 255, (50,))
    screen.fill((10, 10, 30))
    for i, val in enumerate(arr):
        pygame.draw.rect(screen, (200, 100, 255), (i * 16, 400 - val, 10, val))
    pygame.display.flip()
pygame.quit()
