<template>
  <div class="song-chooser">
    <div class="song-chooser__wrapper">
      <div class="song-line" v-for="song in songs" :key="song.source">
        <div class="song-line__arrow">&#x27A4;</div>
        <div class="song-line__details">
          <h4 class="song-line__artist">{{song.artist}}</h4>
          <p class="song-line__title">{{song.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    songs: [
      {
        artist: 'Queen',
        title: 'I want to break free',
        source: 'https://api.soundcloud.com/tracks/179161766',
        lyrics: `
I want to break free
I want to break free
I want to break free from your lies
You're so self-satisfied I don't need you
I've got to break free
God knows, God knows I want to break free

I've fallen in love
I've fallen in love for the first time
And this time I know it's for real
I've fallen in love, yeah
God knows, God knows I've fallen in love

It's strange but it's true
I can't get over the way you love me like you do
But I have to be sure
When I walk out that door
Oh how I want to be free, baby
Oh how I want to be free
Oh how I want to break free

But life still goes on
I can't get used to, living without, living without
Living without you by my side
I don't want to live alone, hey
God knows, got to make it on my own
So baby can't you see
I've got to break free

I've got to break free
I want to break free, yeah
I want, I want, I want, I want to break free`,
      },
      {
        artist: 'String',
        title: 'Shape Of My Heart',
        source: 'https://api.soundcloud.com/tracks/230333838',
        lyrics: `
He deals the cards as a meditation
And those he plays never suspect
He doesn't play for the money he wins
He don't play for respect
He deals the cards to find the answer
The sacred geometry of chance
The hidden law of a probable outcome
The numbers lead a dance
I know that the spades are the swords of a soldier
I know that the clubs are weapons of war
I know that diamonds mean money for this art
But that's not the shape of my heart
He may play the jack of diamonds
He may lay the queen of spades
He may conceal a king in his hand
While the memory of it fades
I know that the spades are the swords of a soldier
I know that the clubs are weapons of war
I know that diamonds mean money for this art
But that's not the shape of my heart
That's not the shape
The shape of my heart
If I told her that I loved you
You'd maybe think there's something wrong
I'm not a man of too many faces
The mask I wear is one
But those who speak know nothing
And find out to their cost
Like those who curse their luck in too many places
And those who fear are lost
I know that the spades are the swords of a soldier
I know that the clubs are weapons of war
I know that diamonds mean money for this art
But that's not the shape of my heart
That's not the shape of my heart
That's not the shape
The shape of my heart`,
      },
      {
        artist: 'Nickelback',
        title: 'Far Away',
        source: 'https://api.soundcloud.com/tracks/117499292',
        lyrics: `
This time, this place misused, mistakes
Too long, too late, who was I to make you wait?
Just one chance, just one breath
Just in case there's just one left
'Cause you know you know, you know
That I love you I have loved you all along and I miss you
Been far away for far too long
I keep dreaming you'll be with me and you'll never go
Stop breathing if I don't see you anymore
On my knees, I'll ask last chance for one last dance
'Cause with you, I'd withstand
All of hell to hold your hand
I'd give it all I'd give for us
Give anything, but I won't give up
'Cause you know you know, you know
That I love you I have loved you all along and I miss you
Been far away for far too long
I keep dreaming you'll be with me and you'll never go
Stop breathing if I don't see you anymore
So far away, so far away
Been far away for far too long
So far away, so far away
Been far away for far too long
But you know, you know, you know
I wanted, I wanted you to stay
'Cause I needed, I need to hear you say
That I love you, I have loved you all along
And I forgive you, for being away for far too long
So keep breathing, 'cause I'm not leaving
Hold on to me and never let me go
Keep breathing, 'cause I'm not leaving you anymore
Believe it, hold on to me and
Never let me go, keep breathing
Hold on to me and never let me go (Keep breathing)
Hold on to me and never let me go`,
      },
    ],
  }),
};
</script>
<style lang="stylus">
.song-chooser
  height 100vh
  overflow hidden

  &__wrapper
    width: 960px;
    height 100%
    margin: auto;
    box-sizing border-box
    display flex
    justify-content center
    align-items center
    flex-direction column

.song-line
  width 100%
  height: 7rem
  display flex
  cursor pointer
  user-select none
  &:hover
    background-color: rgb(78, 110, 142)
  &:active
    background-color: rgb(40, 57, 74)

  &__arrow
    content '&#10148;'
    font-size 2.5rem
    height 7rem
    width 7rem
    display flex
    justify-content center
    align-items center
    flex-grow 0

  &__details
    flex-grow 1
    display flex
    flex-direction column
    justify-content center

  &__artist
    margin 0
    height 35%
    font-size 1.2rem
    display flex
    align-items center

  &__title
    margin 0
    height 35%
    font-size 1.2rem
    display flex
    align-items center
</style>
