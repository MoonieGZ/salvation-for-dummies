import { useEffect, useState } from 'react';
import { Box, Card, Grid, Stack, TextField } from '@mui/material';
import SquareIcon from '@mui/icons-material/Square';
import CircleIcon from '@mui/icons-material/Circle';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@iconify/react';
import StatueIconPng from '../assets/statue.png';

const StatueIcon = () => <img src={StatueIconPng} alt="Statue" />;

const Statue = ({ index, data, setData }) => {
  return (
    <Box>
      Statue {index + 1}:
      <Box>
        <IconButton onClick={() => setData('circle')} sx={{ color: data === 'circle' ? '#880202' : null }}>
          <CircleIcon />
        </IconButton>
        <IconButton onClick={() => setData('triangle')} sx={{ color: data === 'triangle' ? '#880202' : null }}>
          <Icon icon="mdi:triangle" />
        </IconButton>
        <IconButton onClick={() => setData('square')} sx={{ color: data === 'square' ? '#880202' : null }}>
          <SquareIcon />
        </IconButton>
      </Box>
      <StatueIcon />
    </Box>
  );
};

const Statues = ({ statues, setStatues, language }) => {
  const [manualText, setManualText] = useState(undefined);

  const formatValue = (newStatues) => {
    const formatStatue = (statue) => {
      if (statue === 'circle') return language === 'fr' ? 'R' : 'C';
      if (statue === 'triangle') return language === 'fr' ? 'T' : 'T';
      if (statue === 'square') return language === 'fr' ? 'C' : 'S';
      return '';
    };

    const value = formatStatue(newStatues[0]) + formatStatue(newStatues[1]) + formatStatue(newStatues[2]);

    setManualText(value);
  };

  const changeManualValue = (text) => {
    const newStatues = [null, null, null];

    if (!text) return null;

    const formatText = (value) => {
      if (value === 'C' && language === 'us') return 'circle';
      if (value === 'T' && language === 'us') return 'triangle';
      if (value === 'S' && language === 'us') return 'square';
      if (value === 'R' && language === 'fr') return 'circle';
      if (value === 'T' && language === 'fr') return 'triangle';
      if (value === 'C' && language === 'fr') return 'square';
      return null;
    };

    if (text.length >= 1) newStatues[0] = formatText(text[0]);
    if (text.length >= 2) newStatues[1] = formatText(text[1]);
    if (text.length >= 3) newStatues[2] = formatText(text[2]);

    setManualText(text);
    setStatues(newStatues);
  };

  const setStatuesIndex = (index, value) => {
    const newStatues = [...statues];
    newStatues[index] = value;
    formatValue(newStatues);
    setStatues(newStatues);
  };

  const updateText = (text) => {
    if (!text) return null;
    const formatText = (value) => {
      if (value === 'C' && language === 'fr') return 'R';
      if (value === 'R' && language === 'us') return 'C';
      if (value === 'S' && language === 'fr') return 'C';
      if (value === 'C' && language === 'us') return 'S';
      return value;
    };

    let newText = '';

    if (text.length >= 1) newText = newText + formatText(text[0]);
    if (text.length >= 2) newText = newText + formatText(text[1]);
    if (text.length >= 3) newText = newText + formatText(text[2]);

    changeManualValue(newText);
  };

  useEffect(() => {
    updateText(manualText);
  }, [language]);

  const alert = () => {
    if (manualText && /(.).*\1/.test(manualText))
      return (
        <Box sx={{ color: 'red' }}>
          <br />
          {language === 'us'
            ? 'WARNING: THE SAME SYMBOL CANNOT APPEAR TWICE ON TWO DIFFERENT STATUES  '
            : 'ATTENTION: IL NE PEUT PAS AVOIR DEUX FOIS LE MEME SYMBOLE SUR DEUX STATUES DIFFERENTES !'}
        </Box>
      );
  };

  return (
    <Card sx={{ p: 1, m: 2, textAlign: 'center' }}>
      <h3>Statues</h3>
      {language === 'us' ? 'Note the layout of the statues' : 'Note les symboles au dessus de chaque statues'}
      <br />
      <br />
      <TextField value={manualText} onChange={(event) => changeManualValue(event.target.value)} />
      <br />
      <br />
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
        <Statue index={0} data={statues[0]} setData={(value) => setStatuesIndex(0, value)} />
        <Statue index={1} data={statues[1]} setData={(value) => setStatuesIndex(1, value)} />
        <Statue index={2} data={statues[2]} setData={(value) => setStatuesIndex(2, value)} />
      </Stack>
      <br />
      {alert()}
    </Card>
  );
};

export default Statues;
