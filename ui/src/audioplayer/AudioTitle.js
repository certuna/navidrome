import React from 'react'
import { useMediaQuery } from '@material-ui/core'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { QualityInfo } from '../common'
import useStyle from './styles'
import { romanize } from '../common/SongTitleField.js'

const AudioTitle = React.memo(({ audioInfo, isMobile }) => {
  const classes = useStyle()
  const className = classes.audioTitle
  const isDesktop = useMediaQuery('(min-width:810px)')

  if (!audioInfo.song) {
    return ''
  }

  const song = audioInfo.song
  const displayWorkMovement = Boolean(song.work) && Boolean(song.movementName)
  const romanizedMovementNumber = romanize(song.movementNumber)
  const qi = { suffix: song.suffix, bitRate: song.bitRate }

  return (
    <Link to={`/album/${song.albumId}/show`} className={className}>
      <span>
        {displayWorkMovement && (
          <span className={clsx(classes.songTitle, 'songTitle')}>
            {romanizedMovementNumber
              ? `${song.work}: ${romanizedMovementNumber}. ${song.movementName}`
              : `${song.work}: ${song.movementName}`}
          </span>
        )}
        {!displayWorkMovement && (
          <span className={clsx(classes.songTitle, 'songTitle')}>
            {[song.work, song.title, song.songSubtitle]
              .filter(Boolean)
              .join(' · ')}
          </span>
        )}
        {isDesktop && (
          <QualityInfo record={qi} className={classes.qualityInfo} />
        )}
      </span>
      {!isMobile && (
        <span className={clsx(classes.songInfo)}>
          {`${song.artist} · ${song.album}` +
            (song.year ? ` (${song.year})` : '')}
        </span>
      )}
      {isMobile && (
        <>
          <span className={clsx(classes.songInfo, classes.songArtist)}>
            {`${song.artist}`}
          </span>
          <span className={clsx(classes.songInfo, classes.songAlbum)}>
            {song.year ? `${song.album} (${song.year})` : `${song.album}`}
          </span>
        </>
      )}
    </Link>
  )
})

export default AudioTitle
