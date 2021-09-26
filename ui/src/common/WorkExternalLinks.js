import React from 'react'
import { useRecordContext, useTranslate } from 'react-admin'
import { Breadcrumbs, IconButton, Tooltip, Link } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import MusicBrainz from '../icons/MusicBrainz'
import { intersperse } from '../utils'

const WorkExternalLinks = (props) => {
  const { className } = props
  const translate = useTranslate()
  const record = useRecordContext(props)
  let links = []

  const addLink = (url, title, icon) => {
    const translatedTitle = translate(title)
    const link = (
      <Link href={url} target="_blank" rel="noopener noreferrer">
        <Tooltip title={translatedTitle}>
          <IconButton size={'small'} aria-label={translatedTitle}>
            {icon}
          </IconButton>
        </Tooltip>
      </Link>
    )
    const id = links.length
    links.push(<span key={`link-${record.mbzWorkId}-${id}`}>{link}</span>)
  }

  record.mbzWorkId &&
    addLink(
      `https://musicbrainz.org/work/${record.mbzWorkId}`,
      'message.openIn.musicbrainz',
      <MusicBrainz />
    )

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
      {intersperse(links, ',')}
    </Breadcrumbs>
  )
}

export default WorkExternalLinks
