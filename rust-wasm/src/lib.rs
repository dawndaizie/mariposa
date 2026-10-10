use wasm_bindgen::prelude::*;

const MIN_FREQUENCY: f32 = 70.0;
const MAX_FREQUENCY: f32 = 1_100.0;
const SILENCE_RMS: f32 = 0.012;

#[wasm_bindgen]
pub fn rms(samples: &[f32]) -> f32 {
    if samples.is_empty() {
        return 0.0;
    }

    let sum = samples.iter().map(|sample| sample * sample).sum::<f32>();
    (sum / samples.len() as f32).sqrt()
}


#[wasm_bindgen]
pub fn detect_pitch(samples: &[f32], sample_rate: f32) -> f32 {
    if samples.len() < 64 || sample_rate <= 0.0 || rms(samples) < SILENCE_RMS {
        return 0.0;
    }

    let min_lag = (sample_rate / MAX_FREQUENCY).floor().max(1.0) as usize;
    let max_lag = ((sample_rate / MIN_FREQUENCY).ceil() as usize).min(samples.len() / 2);

    if min_lag >= max_lag {
        return 0.0;
    }

    let mean = samples.iter().sum::<f32>() / samples.len() as f32;

    let mut best_lag = 0usize;
    let mut best_score = 0.0_f32;

    for lag in min_lag..=max_lag {
        let mut correlation = 0.0;
        let mut energy_a = 0.0;
        let mut energy_b = 0.0;

        for index in 0..(samples.len() - lag) {
            let a = samples[index] - mean;
            let b = samples[index + lag] - mean;

            correlation += a * b;
            energy_a += a * a;
            energy_b += b * b;
        }

        let denominator = (energy_a * energy_b).sqrt();

        if denominator > 0.000_001 {
            let score = correlation / denominator;

            if score > best_score {
                best_score = score;
                best_lag = lag;
            }
        }
    }

    if best_score < 0.35 || best_lag == 0 {
        return 0.0;
    }

    let pitch = sample_rate / best_lag as f32;

    if (MIN_FREQUENCY..=MAX_FREQUENCY).contains(&pitch) {
        pitch
    } else {
        0.0
    }
}

#[wasm_bindgen]
pub fn frequency_to_midi(frequency: f32) -> i32 {
    if frequency <= 0.0 {
        return -1;
    }

    (69.0 + 12.0 * (frequency / 440.0).log2()).round() as i32
}