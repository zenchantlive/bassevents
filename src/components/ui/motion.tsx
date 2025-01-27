'use client'

import { motion, type MotionProps } from 'framer-motion'
import type { ComponentPropsWithRef } from 'react'

type MotionDivProps = MotionProps & ComponentPropsWithRef<'div'>
type MotionHeadingProps = MotionProps & ComponentPropsWithRef<'h2'>

export const MotionDiv = motion.div as React.FC<MotionDivProps>
export const MotionH2 = motion.h2 as React.FC<MotionHeadingProps>
